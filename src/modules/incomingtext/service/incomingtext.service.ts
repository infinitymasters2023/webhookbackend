/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConnectionPool, Request } from 'mssql';
import { WhatsappDto } from '../dtos/incomingtext-payload.dto';
import axios from 'axios';
import { SendMessageDtoo, SendMessageDtoooo } from '../dtos/newimagesdtos';
import { CommonDTO, SendChatMessageDto } from '../dtos/commonall.dtos';
import { MessageStatusUpdatedDto } from '../dtos/smartping.dtos';
import { CreateTemplateDto } from '../dtos/createtemplate.dtos';
import { LoginByOtpDto } from 'src/modules/auth/dtos/auth.dto';
import { template } from 'handlebars';
//import { Connection } from 'typeorm';



@Injectable()
export class IncomingTextService {
  private readonly authApiUrl = 'https://apis.rmlconnect.net/auth/v1/login/';
  private readonly username = 'InfinityAssuranc';
  private readonly password = 'w$LzFe@72';

  constructor(
    @Inject('DATABASE_CONNECTION') private readonly pool: ConnectionPool,
  ) { }

  public async getAuthToken(): Promise<string> {
    try {
      const payloadObject = {
        username: this.username,
        password: this.password,
      };

      const response = await axios.post(this.authApiUrl, payloadObject, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const token = response.data.JWTAUTH;

      if (!token) {
        throw new Error('Token not found in the response');
      }

      //   console.log('Retrieved Auth Token:', token);
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      throw new HttpException(
        error.response?.data || 'An error occurred while retrieving token',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  async handlesendmessage(sendMessageDto: SendMessageDtoooo): Promise<any> {
    console.log('Received message:', sendMessageDto);
    let poolConnection;

    try {
      // Establish connection to the database
      poolConnection = await this.pool.connect();

      const phoneNumber = sendMessageDto.phone

      console.log('phoneNumber checking', phoneNumber)
      const whatsappDto = {
        phone: `+91${phoneNumber}`,
        text: sendMessageDto.text,
        enable_acculync: true,
        // extra: sendMessageDto.extra,
      };

      console.log('Prepared WhatsApp DTO:', whatsappDto);

      // Get the authorization token
      const authToken = await this.getAuthToken();

      // Send WhatsApp message via API
      const whatsappResponse = await axios.post('https://apis.rmlconnect.net/wba/v1/messages', whatsappDto, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken,
        }
      });

      console.log('WhatsApp API Response:', whatsappResponse.data);

      return whatsappResponse.data;

    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    } finally {
      if (poolConnection) {
        await poolConnection.close();
      }
    }
  }

  /**********************commondtos*********************************************************** */
  async handleallRequest(requestDto: CommonDTO): Promise<any> {
    let poolConnection;
    try {
      poolConnection = await this.pool.connect();
      const request = new Request(poolConnection);

      // Process each message
      for (const messageDto of requestDto.messages) {
        // Set SQL parameters based on message type
        request.input('type', 1);
        request.input('ID', messageDto.id);
        request.input('FromNumber', messageDto.from);
        request.input('Timestamp', messageDto.timestamp);
        request.input('MessageType', messageDto.type);
        request.input('BrandMsisdn', requestDto.brand_msisdn);
        request.input('RequestID', requestDto.request_id); // Fixed parameter name

        // Handle specific message types
        switch (messageDto.type) {
          case 'voice':
            const voice = messageDto.voice;
            if (voice) {
              request.input('WFile', voice.file);
              request.input('Wid', voice.id);
              request.input('MimeType', voice.mime_type);
              request.input('Sha256', voice.sha256);
              request.input('MediaUrl', voice.media_url);
            }
            break;
          case 'audio':
            const audio = messageDto.audio;
            if (audio) {
              request.input('WFile', audio.file);
              request.input('Wid', audio.id);
              request.input('MimeType', audio.mime_type);
              request.input('Sha256', audio.sha256);
              request.input('MediaUrl', audio.media_url);
            }
            break;
          case 'video':
            const video = messageDto.video;
            if (video) {
              request.input('WFile', video.file);
              request.input('Wid', video.id);
              request.input('MimeType', video.mime_type);
              request.input('Sha256', video.sha256);
              request.input('MediaUrl', video.media_url);
            }
            break;


          case 'text':
            const text = messageDto.text;
            if (text) {
              request.input('Body', text.body);
            }
            break;

          case 'image':
            const image = messageDto.image;
            if (image) {
              request.input('WFile', image.file);
              request.input('Wid', image.id);
              request.input('MimeType', image.mime_type);
              request.input('Sha256', image.sha256);
              request.input('MediaUrl', image.media_url);
              request.input('Caption', image.caption);
            }
            break;

          case 'document':
            const document = messageDto.document;
            if (document) {
              request.input('WFile', document.file);
              request.input('Wid', document.id);
              request.input('MimeType', document.mime_type);
              request.input('Sha256', document.sha256);
              request.input('MediaUrl', document.media_url);
              request.input('Caption', document.caption);
            }
            break;
        }

        if (requestDto.contacts) {
          for (const contactDto of requestDto.contacts) {
            request.input('ProfileName', contactDto.profile.name);
            request.input('WaID', contactDto.wa_id);
          }
        }

        // Execute SQL command to insert/update message details
        await request.execute('sp_Iapl_crm_whatsappwebhook_resp');
      }

      return { success: true };
    } catch (error) {
      console.error('Error handling request:', error);
      throw new Error('Failed to process request');
    } finally {
      if (poolConnection) {
        poolConnection.close();
      }
    }
  }






  private readonly whatsappApiUrl = 'https://apis.rmlconnect.net/wba/v1/messages';




  /*********************template send messages*********************************************************/


  public async sendWhatsappMessage(whatsappDto: WhatsappDto): Promise<any> {
    try {
      const authToken = await this.getAuthToken();

      console.log('Sending payload:', JSON.stringify(whatsappDto));
      console.log('Using Auth Token:', authToken);

      const payload = {
        phone: whatsappDto.phone,
        media: {
          type: 'media_template',
          template_name: 'welcome',
          lang_code: 'en',
        },
      };

      const response = await axios.post(this.whatsappApiUrl, payload, {
        headers: {
          Authorization: `${authToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new HttpException(
        error.response?.data || 'An error occurred while sending message',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  /********************************chat **************************************************** */
  private readonly apiUrl = 'https://apis.rmlconnect.net/wba/v1/messages';
  public async sendMessage(whatsappDto: SendMessageDtoo): Promise<any> {
    try {
      const authToken = await this.getAuthToken();

      console.log('Sending payload:', JSON.stringify(whatsappDto));
      console.log('Using Auth Token:', authToken);

      const payload = {
        phone: whatsappDto.phone,
        // extra: whatsappDto.extra || '',
        // enable_acculync: true,
        media: {
          type: 'media_template',
          // template_name: whatsappDto.template_name || 'welcome',
          // lang_code: whatsappDto.lang_code || 'en',
          body: [
            { text: 'Welcome!' }, // Add your dynamic text variables here
          ],
          button: [
            {
              button_no: '0/1',
              // url: whatsappDto.dynamic_url || 'https://your-default-url.com',
            },
          ],
        },
      };

      const response = await axios.post(this.whatsappApiUrl, payload, {
        headers: {
          Authorization: `${authToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new HttpException(
        error.response?.data || 'An error occurred while sending the message',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  /*************************************************************************************************COUNTRY CODE********************************************************************************************************************************** */

  async countrycode() {
    try {
      const poolConnection = await this.pool.connect();
      const request = new Request(poolConnection);
      request.input('processtype', 2);
      const result = await request.execute('whatsApptemplatedatamanage');
      const insertedData = result.recordsets[0];

      return insertedData;
    } catch (error) {
      throw error;
    } finally {
      if (this.pool.connected) {
        await this.pool.close();
      }
    }

  }



  /*****************************************************************************smartping******************************************************************************************************************************** */
  // public async executeInsertMessage(messageDto: MessageStatusUpdatedDto): Promise<any> {
  //   let poolConnection;
  //   try {
  //     console.log('🚀 [DB Operation] Starting message insert...');
  //     poolConnection = await this.pool.connect();
  //     const request = new Request(poolConnection);

  //     const message = messageDto.data.message;
  //     console.log('🧩 [Message Extracted]', message.id, '-', message.message_type);

  //     // Insert common fields for all message types
  //     request.input('processtype', 9);
  //     request.input('Id', message.id);
  //     request.input('Type', message.type);
  //     request.input('PhoneNumber', message.phone_number);
  //     request.input('ContactId', message.contact_id);
  //     request.input('Campaign', JSON.stringify(message.campaign));
  //     request.input('Sender', message.sender);
  //     request.input('channel_no', message.project_id);

  //     // Message Content
  //     if (message.message_content) {
  //       console.log('📝 [MessageContent] Text:', message.message_content.text);
  //       request.input('MessageContent_Text', message.message_content.text || null);
  //       request.input('MessageContent_Caption', message.message_content.caption || null);
  //       request.input('MessageContent_URL', message.message_content.url || null);
  //       request.input('MessageContent_UrlExpiry', message.message_content.urlExpiry || null);
  //     }

  //     // Message meta info
  //     request.input('MessageType', message.message_type);
  //     request.input('Status', message.status);
  //     request.input('IsHSM', message.is_HSM.toString());

  //     // Chatbot response
  //     if (message.chatbot_response) {
  //       console.log('🤖 [ChatbotResponse] Intent:', message.chatbot_response.intent);
  //       request.input('ChatbotResponse', JSON.stringify(message.chatbot_response));
  //     }

  //     // Optional values
  //     request.input('AgentId', message.agent_id || null);
  //     request.input('SentAt', message.sent_at ? message.sent_at.toString() : null);
  //     request.input('DeliveredAt', message.delivered_at ? message.delivered_at.toString() : null);
  //     request.input('ReadAt', message.read_at ? message.read_at.toString() : null);

  //     // Failure response
  //     if (message.failureResponse) {
  //       console.log('⚠️ [FailureResponse]', message.failureResponse);
  //       request.input('FailureResponse', JSON.stringify(message.failureResponse));
  //     }

  //     // Other details
  //     request.input('UserName', message.userName || null);
  //     request.input('CountryCode', message.countryCode || null);
  //     request.input('SubmittedMessageId', message.submitted_message_id || null);
  //     request.input('MessagePrice', message.message_price.toString());
  //     request.input('DeductionType', message.deductionType || null);

  //     // MAU details
  //     if (message.mau_details) {
  //       console.log('📊 [MAU Details]', message.mau_details);
  //       request.input('MauDetails', JSON.stringify(message.mau_details));
  //     }

  //     // WhatsApp conversation
  //     if (message.whatsapp_conversation_details) {
  //       console.log('💬 [WA Conversation]', message.whatsapp_conversation_details.id);
  //       request.input('WhatsAppConversationDetails_Id', message.whatsapp_conversation_details.id);
  //       request.input('WhatsAppConversationDetails_Type', message.whatsapp_conversation_details.type);
  //     }

  //     // Context
  //     request.input('Context', JSON.stringify(message.context || {}));
  //     request.input('MessageId', message.messageId);

  //     // Handle attachments
  //     switch (message.type) {
  //       case 'voice':
  //       case 'audio':
  //       case 'video':
  //       case 'text':
  //       case 'image':
  //       case 'document':
  //         if ('contacts' in messageDto.data.message && messageDto.data.message.contacts) {
  //           console.log('📞 [Contacts Detected]', messageDto.data.message.contacts);
  //           request.input('Contacts', JSON.stringify(messageDto.data.message.contacts));
  //         }
  //         break;
  //     }

  //     console.log('🗄️ [Executing SP] whatsApptemplatedatamanage with message ID:', message.id);
  //     const result = await request.execute('whatsApptemplatedatamanage');

  //     console.log('✅ [SP Completed] Stored procedure executed successfully.');
  //     return result;

  //   } catch (error) {
  //     console.error('❌ [DB Error] Failed to insert message:', error);
  //     throw new Error('Failed to process request');
  //   } finally {
  //     if (poolConnection) {
  //       console.log('🔚 [DB Connection] Releasing connection...');
  //       poolConnection.release();
  //     }
  //   }
  // }
public async executeInsertMessage(messageDto: MessageStatusUpdatedDto): Promise<any> {
  let poolConnection;
  try {
    console.log('🚀 [DB Operation] Starting message insert...');
    poolConnection = await this.pool.connect();
    const request = new Request(poolConnection);

    const message = messageDto.data.message;

    // -------------------------------
    // Insert common fields for all message types
    // -------------------------------
    request.input('processtype', 9);
    request.input('Id', message.id);
    request.input('Type', message.type);
    request.input('PhoneNumber', message.phone_number);
    request.input('ContactId', message.contact_id);
    request.input('Campaign', JSON.stringify(message.campaign));
    request.input('Sender', message.sender);
    request.input('channel_no', message.project_id);

    // Message Content
    if (message.message_content) {
      request.input('MessageContent_Text', message.message_content.text || null);
      request.input('MessageContent_Caption', message.message_content.caption || null);
      request.input('MessageContent_URL', message.message_content.url || null);
      request.input('MessageContent_UrlExpiry', message.message_content.urlExpiry || null);
    }

    // Message meta info
    request.input('MessageType', message.message_type);
    request.input('Status', message.status);
    request.input('IsHSM', message.is_HSM.toString());

    // Chatbot response
    if (message.chatbot_response) {
      request.input('ChatbotResponse', JSON.stringify(message.chatbot_response));
    }

    // Optional values
    request.input('AgentId', message.agent_id || null);
    request.input('SentAt', message.sent_at ? message.sent_at.toString() : null);
    request.input('DeliveredAt', message.delivered_at ? message.delivered_at.toString() : null);
    request.input('ReadAt', message.read_at ? message.read_at.toString() : null);

    // Failure response
    if (message.failureResponse) {
      request.input('FailureResponse', JSON.stringify(message.failureResponse));
    }

    // Other details
    request.input('UserName', message.userName || null);
    request.input('CountryCode', message.countryCode || null);
    request.input('SubmittedMessageId', message.submitted_message_id || null);
    request.input('MessagePrice', message.message_price.toString());
    request.input('DeductionType', message.deductionType || null);

    // MAU details
    if (message.mau_details) {
      request.input('MauDetails', JSON.stringify(message.mau_details));
    }

    // WhatsApp conversation
    if (message.whatsapp_conversation_details) {
      request.input('WhatsAppConversationDetails_Id', message.whatsapp_conversation_details.id);
      request.input('WhatsAppConversationDetails_Type', message.whatsapp_conversation_details.type);
    }

    // Context
    request.input('Context', JSON.stringify(message.context || {}));
    request.input('MessageId', message.messageId);

    // Handle attachments
    switch (message.type) {
      case 'voice':
      case 'audio':
      case 'video':
      case 'text':
      case 'image':
      case 'document':
        if ('contacts' in messageDto.data.message && messageDto.data.message.contacts) {
          request.input('Contacts', JSON.stringify(messageDto.data.message.contacts));
        }
        break;
    }

    console.log('🗄️ [Executing SP] whatsApptemplatedatamanage with message ID:', message.id);
    const result = await request.execute('whatsApptemplatedatamanage');
    console.log('✅ [SP Completed] Stored procedure executed successfully.');

    // -------------------------------
    // Auto-send template message if channel_no matches
    // -------------------------------
    if (message.project_id === '6593fdb700f84f37323b819d') {
      try {
        console.log('📩 [Auto-Sending Template Message] for channel_no:', message.project_id);

        const chatDto: SendChatMessageDto = {
          projectId: message.project_id,
          to: message.phone_number.startsWith('+') ? message.phone_number : `+${message.phone_number}`,
          type: 'template', // fixed template type
        };

        const chatResponse = await this.sendChatMessage(chatDto);
        console.log('✅ [AiSensy Template Message Sent]', chatResponse);
      } catch (err) {
        console.error('❌ [AiSensy Send Error]', err);
      }
    }

    return result;
  } catch (error) {
    console.error('❌ [DB Error] Failed to insert message:', error);
    throw new Error('Failed to process request');
  } finally {
    if (poolConnection) {
      console.log('🔚 [DB Connection] Releasing connection...');
      poolConnection.release();
    }
  }
}


  /*************************************smartping chat*********************************************************************** */

private readonly apiBaseUrl = 'https://apis.aisensy.com/project-apis/v1/project';
private readonly partnerApiKey = 'e7cd0798dc1fcd42ccf05';

public async sendChatMessage(dto: SendChatMessageDto): Promise<any> {
  try {
    const { to, type = 'text', body, imageLink, documentLink, caption, template } = dto;

    // ✅ Always ensure phone number has a '+' prefix
    const formattedTo = to.startsWith('+') ? to : `+${to}`;

    const payload: any = {
      projectId: '6593fdb700f84f37323b819d',
      to: formattedTo,
      type,
      recipient_type: 'individual',
    };

    // Build message content based on type
    if (type === 'text') {
      payload.text = { body };
    } else if (type === 'image' && imageLink) {
      payload.image = { link: imageLink, caption: caption || '' };
    } else if (type === 'document' && documentLink) {
      payload.document = { link: documentLink, caption: caption || '' };
    } else if (type === 'template') {
      // Use provided template if exists, otherwise default
      const tpl = template || {
        name: 'test_iamge2',
        language: { code: 'en' },
        components: [],
      };

      // Ensure components is always an array
      tpl.components = tpl.components || [];

      payload.template = {
        name: tpl.name,
        language: tpl.language,
        components: tpl.components,
      };
    } else {
      throw new Error('Invalid message type or missing content');
    }

    const response = await axios.post(
      `${this.apiBaseUrl}/${payload.projectId}/messages`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-AiSensy-Project-API-Pwd': this.partnerApiKey,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error sending AiSensy chat message:', error.response?.data || error.message);
    throw new HttpException(
      error.response?.data || 'Failed to send chat message',
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}


 

  public async getMessageDetails(projectId: string, messageId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.apiBaseUrl}/${projectId}/messages/${messageId}`,
        {
          headers: {
            'Accept': 'application/json',
            'X-AiSensy-Project-API-Pwd': this.partnerApiKey,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching AiSensy message details:', error.response?.data || error.message);
      throw new HttpException(
        error.response?.data || 'Failed to fetch message details',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


}