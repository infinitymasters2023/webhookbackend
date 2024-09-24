/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConnectionPool, Request } from 'mssql';
import {    WhatsappDto } from '../dtos/incomingtext-payload.dto';
import axios from 'axios';
import { SendMessageDtoo, SendMessageDtoooo } from '../dtos/newimagesdtos';
import { CommonDTO } from '../dtos/commonall.dtos';
import { MessageDto } from '../dtos/smartping.dtos';
import { CreateTemplateDto } from '../dtos/createtemplate.dtos';
import { LoginByOtpDto } from 'src/modules/auth/dtos/auth.dto';
//import { Connection } from 'typeorm';



@Injectable()
export class IncomingTextService {
  private readonly authApiUrl = 'https://apis.rmlconnect.net/auth/v1/login/';
  private readonly username = 'InfinityAssuranc';
  private readonly password = 'w$LzFe@72';

  constructor(
    @Inject('DATABASE_CONNECTION') private readonly pool: ConnectionPool,
  ) {}

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
     
    console.log('phoneNumber checking',phoneNumber)
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
  /***************************************COUNTRY CODE********************************************************************************************************************************** */

  async countrycode(){
    try {
        const poolConnection = await this.pool.connect();
        const request = new Request(poolConnection);
        request.input('processtype', 2);
        const result = await request.execute('smartpingInsertMessageData');
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


/*****************************smartping******************************************************************************************************************************** */
public async executeInsertMessage(messageDto: MessageDto): Promise<any> {
  let poolConnection;
  try {
    poolConnection = await this.pool.connect();
    const request = new Request(poolConnection);

    request.input('Id', messageDto.id);
    request.input('Type', messageDto.type);
    request.input('PhoneNumber', messageDto.phone_number);
    request.input('ContactId', messageDto.contact_id);
    request.input('Campaign', messageDto.campaign);
    request.input('Sender', messageDto.sender);
    request.input('MessageContent_Text', messageDto.message_content.text);
    request.input('MessageContent_Text', messageDto.message_content.caption);
    request.input('MessageContent_Text', messageDto.message_content.url);
    request.input('MessageContent_Text', messageDto.message_content.urlExpiry);
    request.input('MessageType', messageDto.message_type);
    request.input('Status', messageDto.status);
    request.input('IsHSM', messageDto.is_HSM.toString());
    request.input('ChatbotResponse', messageDto.chatbot_response);
    request.input('AgentId', messageDto.agent_id);
    request.input('SentAt', messageDto.sent_at.toString());
    request.input('DeliveredAt', messageDto.delivered_at.toString());
    request.input('ReadAt', messageDto.read_at.toString());
    request.input('FailureResponse', messageDto.failureResponse);
    request.input('UserName', messageDto.userName);
    request.input('CountryCode', messageDto.countryCode);
    request.input('SubmittedMessageId', messageDto.submitted_message_id);
    request.input('MessagePrice', messageDto.message_price.toString());
    request.input('DeductionType', messageDto.deductionType);
    request.input('MauDetails', messageDto.mau_details);
    request.input('WhatsAppConversationDetails_Id', messageDto.whatsapp_conversation_details.id);
    request.input('WhatsAppConversationDetails_Type', messageDto.whatsapp_conversation_details.type);
    request.input('Context', messageDto.context);
    request.input('MessageId', messageDto.messageId);

    await request.execute('smartpingInsertMessageData');
  } catch (error) {
    console.error('Error handling request:', error);
    throw new Error('Failed to process request');
  } finally {
    if (poolConnection) {
      poolConnection.release(); // or poolConnection.close() depending on your library
    }
  }
}
/**************************************************************************gettemplate****************************************************************************************** */
public async getTemplates(): Promise<any> {
  try {
    const token = await this.getAuthToken();
    const response = await axios.get('https://apis.rmlconnect.net/wba/templates', {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching templates:', error);
    throw new HttpException(
      error.response?.data || 'An error occurred while fetching templates',
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }finally {
    if (this.pool.connected) {
        await this.pool.close();
    }
} 
}

/***********************************************create Admin template**************************************************************************************************** */
//private readonly apiUrl = 'https://apis.rmlconnect.net/wba/template/create';
public readonly templateApiUrl = 'https://apis.rmlconnect.net/wba/template/create';
public async createTemplate(createTemplateDto: CreateTemplateDto): Promise<any> {
  let poolConnection;

  try {
    // Get the auth token
    const token = await this.getAuthToken();

    if (!token) {
      throw new HttpException('Token generation failed', HttpStatus.UNAUTHORIZED);
    }

    const response = await axios.post(
      'https://apis.rmlconnect.net/wba/template/create',
      createTemplateDto,
      {
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    console.log('template', createTemplateDto);

    poolConnection = await this.pool.connect();
    const request = new Request(poolConnection);

    request.input('processtype', 3);
    request.input('Approve', 1);
    request.input('TemplateType', createTemplateDto.template_type);
    request.input('TemplateName', createTemplateDto.template_name);
    request.input('Language', createTemplateDto.language.join(','));
    request.input('TemplateCategory', createTemplateDto.template_category);
    request.input('BodyText', createTemplateDto.components.body.text);
    const bodyExampleString = createTemplateDto.components.body.example.join(', ');
    request.input('BodyExample', bodyExampleString); 
    request.input('HeaderType', createTemplateDto.components.header.type);
    request.input('HeaderText', createTemplateDto.components?.header?.text || null);
    request.input('FooterText', createTemplateDto.components.footer.text);
    request.input('ButtonsType', createTemplateDto.components.buttons.type);
    createTemplateDto.components.buttons.elements.forEach((button, index) => {
    console.log(`Button ${index + 1}: `, button);
    request.input(`ButtonLabel`, button.label);
    request.input(`ButtonWebsite`, button.website || null);
    request.input(`ButtonWebType`, button.type || null);
      if (button.contact_no) {
        request.input(`ButtonContactNo${index + 1}`, button.contact_no); 
      }
    });
    await request.execute('smartpingInsertMessageData');
    return response.data;

  } catch (error) {
    console.error('Error creating template:', error);

    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.response?.data || 'An error occurred while creating the template';

    throw new HttpException(message, status);

  } finally {
    if (this.pool.connected) {
        await this.pool.close();
    }
}
}


/************************************************create  Local template************************************************************************************************************************ */
public async localcreateTemplate(createTemplateDto: CreateTemplateDto): Promise<any> {
  let poolConnection;

  try {
    // Get the auth token
    // const token = await this.getAuthToken();

    // if (!token) {
    //   throw new HttpException('Token generation failed', HttpStatus.UNAUTHORIZED);
    // }

    // const response = await axios.post(
    //   'https://apis.rmlconnect.net/wba/template/create',
    //   createTemplateDto,
    //   {
    //     headers: {
    //       'Authorization': ` ${token}`,
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //     },
    //   }
    // );

    console.log('template', createTemplateDto);

    poolConnection = await this.pool.connect();
    const request = new Request(poolConnection);

    request.input('processtype', 3);
    request.input('Approve', 0);
    request.input('TemplateType', createTemplateDto.template_type);
    request.input('TemplateName', createTemplateDto.template_name);
    request.input('Language', createTemplateDto.language.join(','));
    request.input('TemplateCategory', createTemplateDto.template_category);
    request.input('BodyText', createTemplateDto.components.body.text);
    const bodyExampleString = createTemplateDto.components.body.example.join(', ');
    request.input('BodyExample', bodyExampleString); 
    request.input('HeaderType', createTemplateDto.components.header.type);
    request.input('HeaderText', createTemplateDto.components?.header?.text || null);
    request.input('FooterText', createTemplateDto.components.footer.text);
    request.input('ButtonsType', createTemplateDto.components.buttons.type);
    createTemplateDto.components.buttons.elements.forEach((button, index) => {
    console.log(`Button ${index + 1}: `, button);
    request.input(`ButtonLabel`, button.label);
    request.input(`ButtonWebsite`, button.website || null);
    request.input(`ButtonWebType`, button.type || null);
      if (button.contact_no) {
        request.input(`ButtonContactNo${index + 1}`, button.contact_no); 
      }
    });
    await request.execute('smartpingInsertMessageData');
   // return response.data;

  } catch (error) {
    console.error('Error creating template:', error);

    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.response?.data || 'An error occurred while creating the template';

    throw new HttpException(message, status);

  } finally {
    if (poolConnection) {
      poolConnection.release();
    }
  }
}

async findOneBytemplateName(templatename: string): Promise<any> {
  try {
    const poolConnection = await this.pool.connect();
    const request = new Request(poolConnection);

    request.input('processtype', 4);
    request.input('TemplateName', templatename);

    console.log('TemplateName', templatename);
    console.log(typeof templatename);

    const result = await request.execute('smartpingInsertMessageData');
    const insertedData = result.recordsets[0];

    // Return all data as is
    return insertedData;
  } catch (error) {
    console.log('error', error);
    throw error;
  } finally {
    if (this.pool.connected) {
      await this.pool.close();
    }
  }
}

async findtemplatealldata(): Promise<any> {
  try {
    const poolConnection = await this.pool.connect();
    const request = new Request(poolConnection);

    request.input('processtype', 5);

    const result = await request.execute('smartpingInsertMessageData');
    const insertedData = result.recordsets[0];

    // Return all data as is
    return insertedData;
  } catch (error) {
    console.log('error', error);
    throw error;
  } finally {
    if (this.pool.connected) {
      await this.pool.close();
    }
  }
}
async clientlogin(contactpersonmobileno: string){
  try {
      const poolConnection = await this.pool.connect();
      const request = new Request(poolConnection);
      request.input('Type', 32);
      request.input('contactpersonmobileno', contactpersonmobileno);
      const result = await request.execute('sp_nestjs_buyinfyshield');
      const insertedData = result.recordsets[0];
      console.log('insertedData', insertedData);
      return insertedData;
  } catch (error) {
      throw error;
  } finally {
      if (this.pool.connected) {
          await this.pool.close();
      }
  }

}
async updateOtpByMobile(sendOTPMultiFactorDto:LoginByOtpDto): Promise<any> {
  try {
      const poolConnection = await this.pool.connect();
      const request = new Request(poolConnection);
      request.input('Type',33);
      request.input('otp',sendOTPMultiFactorDto.otp);
      request.input('mobileno',sendOTPMultiFactorDto.mobile);
      const result = await request.execute('sp_nestjs_buyinfyshield');
      const insertedData = result.recordsets[0];
      return insertedData;
  } catch (error) {
      console.log('error', error);
      throw error;
  } finally {
      if (this.pool.connected) {
          await this.pool.close();
      }
  }
}


/****************************************************************************deleted********************************************************************************************** */
async deletedtemp(templatename:string): Promise<any> {
  try {
      const poolConnection = await this.pool.connect();
      const request = new Request(poolConnection);
      request.input('processtype',8);
      request.input('TemplateName',templatename);
      const result = await request.execute('smartpingInsertMessageData');
      const insertedData = result.recordsets[0];
      return insertedData;
  } catch (error) {
      console.log('error', error);
      throw error;
  } finally {
      if (this.pool.connected) {
          await this.pool.close();
      }
  }
}


}