/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConnectionPool, Request } from 'mssql';
import {  MessageDto,   WhatsappDto } from '../dtos/incomingtext-payload.dto';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { MessagedocsDto } from '../dtos/MessagedocsDto';
import { MessagedocssDto, RequestDto, VoiceDto } from '../dtos/DocumentdocsDto';
import { CreateMessageDto } from '../dtos/imageget.dto';

import { SendMessageDto } from '../dtos/newimagesdtos';

//import { MessageallDto } from '../dtos/DocumentdocsDto';


@Injectable()
export class IncomingTextService {
  private readonly authApiUrl = 'https://apis.rmlconnect.net/auth/v1/login/';
  private readonly username = 'InfinityAssuranc';
  private readonly password = 'w$LzFe@72';

  constructor(
    @Inject('DATABASE_CONNECTION') private readonly pool: ConnectionPool,
  ) {}

  public async processIncomingMessage(message: MessagedocssDto): Promise<any> {
    switch (message.type) {
      case 'text':
        return this.handleWebhook(message as MessageDto);
  
      default:
        throw new Error(`Unsupported message type: ${message.type}`);
    }
  }

  

  private isMessageDto(dto: any): dto is MessageDto {
    return dto.from !== undefined && dto.type === 'text';
  }
  
  // Type guard for MessagedocsDto
  private isDocumentDto(dto: any): dto is MessagedocsDto {
    return dto.from !== undefined && dto.type === 'document';
  }


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

      console.log('Retrieved Auth Token:', token);
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      throw new HttpException(
        error.response?.data || 'An error occurred while retrieving token',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
 
  public async handleWebhook(messageDto: MessageDto): Promise<any> {
    let poolConnection;
    try {
      poolConnection = await this.pool.connect();
      const request = new Request(poolConnection);
      request.input('Type', 1);
      request.input('id', uuidv4());
      request.input('from', messageDto.from);
      request.input('message_id', messageDto.message_id);
      request.input('body', messageDto.text.body);
      request.input('brand_msisdn', messageDto.brand_msisdn);
      request.input('request_id', messageDto.request_id);
      request.input('name', messageDto.name);
      request.input('wa_id', messageDto.wa_id);
                  
      const result = await request.execute('InsertWebhookData');
      const insertedData = result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;
  
      // Get the auth token
      const authToken = await this.getAuthToken();
  
      // Use the 'from' and 'body' values along with the auth token
      console.log('From:', messageDto.from);
      console.log('Message ID:', messageDto.message_id);
      console.log('Body:', messageDto.text.body);
      console.log('Brand MSISDN:', messageDto.brand_msisdn);
      console.log('Request ID:', messageDto.request_id);
      console.log('Name:', messageDto.name);
      console.log('WA ID:', messageDto.wa_id);
      console.log('Timestamp:', messageDto.timestamp);
      console.log('Auth Token:', authToken);
      console.log('Inserted Data:', insertedData);
      const whatsappDto: WhatsappDto = {
        phone: `+91${messageDto.from}`,
      };
  console.log('phone number ',messageDto.from)
  
      const whatsappResponse = await this.sendWhatsappMessage(whatsappDto);
      console.log('WhatsApp API Response:', whatsappResponse);
  
      return insertedData;
    } catch (error) {
      console.log('Error inserting webhook data:', error);
      throw error;
    } finally {
      if (poolConnection) {
        await poolConnection.close();
      }
    }
  }

 public async handledocsWebhook(messagedocsDto: MessagedocsDto): Promise<any> {
    // Ensure that the document property exists
    if (!messagedocsDto.document) {
      throw new Error('Document property is missing in the incoming message');
    }
  
    let poolConnection;
    try {
      poolConnection = await this.pool.connect();
      const request = poolConnection.request();
  
      // Logging to verify the incoming data
      console.log('Received document data:', messagedocsDto.document);
  
      // Setting inputs for the stored procedure
      request.input('type', 2);
      request.input('id', uuidv4());
      request.input('from', messagedocsDto.from);
      request.input('message_id', messagedocsDto.id);
      request.input('caption', messagedocsDto.document.caption ); // Use a default empty string if caption is missing
      request.input('file', messagedocsDto.document.file ); // Use a default empty string if file is missing
      request.input('mime_type', messagedocsDto.document.mime_type); // Use a default empty string if mime_type is missing
      request.input('sha256', messagedocsDto.document.sha256); // Use a default empty string if sha256 is missing
      request.input('media_url', messagedocsDto.document.media_url); // Use a default empty string if media_url is missing
  
      const result = await request.execute('InsertWebhookData');
      const insertedData = result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;
  
      const authToken = await this.getAuthToken();
  
      // Logging the data
      console.log('Auth Token:', authToken);
      console.log('Inserted Data:', insertedData);
  
      const whatsappDto: WhatsappDto = {
        phone: `+91${messagedocsDto.from}`,
      };
  
      const whatsappResponse = await this.sendWhatsappMessage(whatsappDto);
      console.log('WhatsApp API Response:', whatsappResponse);
  
      return insertedData;
    } catch (error) {
      console.error('Error inserting webhook data:', error);
      throw error;
    } finally {
      if (poolConnection) {
        await poolConnection.close();
      }
    }
  }
 // Create a method to wrap the image processing

 async handleIncomingImageMessage(clientCallback: string, sendMessageDto: SendMessageDto): Promise<any> {
  console.log('Received message:', sendMessageDto);
  let poolConnection;
  try {
    // Establish connection to the database
    poolConnection = await this.pool.connect();
    const request = new Request(poolConnection);

    // Extract values from DTO and set parameters for the stored procedure
    const message = sendMessageDto.messages[0]; // Assuming the messages array has at least one item
    const image = message?.image;

    request.input('Type', 3);
   // request.input('id', uuidv4());
    request.input('apikey', sendMessageDto.apiKey);
    request.input('from', message?.from);
    request.input('id', message?.id);
    request.input('file', image?.file);
    request.input('image_id', image?.id);
 //   request.input('mime_type', image?.mime_type);
    request.input('sha256', image?.sha256);
    request.input('caption', image?.caption);
    request.input('media_url', image?.media_url);
   // request.input('type', message?.type);
    request.input('brand_msisdn', sendMessageDto.brand_msisdn);
    request.input('request_id', sendMessageDto.request_id);

    // Execute the stored procedure
    const result = await request.execute('InsertWebhookData');
    const insertedData = result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;

    // Get the auth token
    const authToken = await this.getAuthToken();

    // Prepare and send WhatsApp message
    const whatsappDto = {
      phone: `+91${message?.from}`, // Adjust as necessary
    };

    // Log WhatsApp DTO and Auth Token
    console.log('Prepared WhatsApp DTO:', whatsappDto);
    console.log('Auth Token:', authToken);

    // Send WhatsApp message
    const whatsappResponse = await this.sendWhatsappMessage(whatsappDto);
    console.log('WhatsApp API Response:', whatsappResponse);

    return insertedData;
  } catch (error) {
    console.error('Error inserting webhook data:', error);
    throw error;
  } finally {
    if (poolConnection) {
      await poolConnection.close();
    }
  }
}

  
  

  // async handleIncomingImageMessage(createMessageDto: CreateMessageDto): Promise<any> {
  //   //this.logger.log('Received message:', createMessageDto);
  //   let poolConnection;
  //   try {
  //     // Establish connection to the database
  //     poolConnection = await this.pool.connect();
  //     const request = new Request(poolConnection);

  //     // Map DTO fields to stored procedure parameters
  //     request.input('Type', 3);
  //     request.input('id', uuidv4());
  //     request.input('api_key', createMessageDto.apiKey);
  //     request.input('from_msisdn', createMessageDto.messages[0]?.from);
  //     request.input('message_id', createMessageDto.messages[0]?.id);
  //     request.input('file_path', createMessageDto.messages[0]?.image?.file);
  //     request.input('image_id', createMessageDto.messages[0]?.image?.id);
  //     request.input('mime_type', createMessageDto.messages[0]?.image?.mime_type);
  //     request.input('sha256', createMessageDto.messages[0]?.image?.sha256);
  //     request.input('caption', createMessageDto.messages[0]?.image?.caption);
  //     request.input('media_url', createMessageDto.messages[0]?.image?.media_url);
  //     request.input('message_type', createMessageDto.messages[0]?.type);
  //     request.input('brand_msisdn', createMessageDto.brand_msisdn);
  //     request.input('request_id', createMessageDto.request_id);

  //     // Execute the stored procedure
  //     const result = await request.execute('InsertWebhookData');
  //     const insertedData = result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;

  //   //  Obtain the auth token (you would implement the getAuthToken method)
  //    const authToken = await this.getAuthToken();

  //  //   Prepare the WhatsApp message payload
  //     const whatsappDto: WhatsappDto = {
  //       phone: `+91${createMessageDto.messages[0]?.from}`, // Adjust as necessary
  //     };
  //       console.log('')
  //  //   Send the WhatsApp message (you would implement the sendWhatsappMessage method)
  //    const whatsappResponse = await this.sendWhatsappMessage(whatsappDto);
      
  //  //   Log the responses for debugging
     
      
  //     return insertedData;
  //   } catch (error) {
   
  //     throw error;
  //   } finally {
  //     // Ensure the connection is closed after the operation
  //     if (poolConnection) {
  //       await poolConnection.close();
  //     }
  //   }
  // }

  
  private readonly whatsappApiUrl = 'https://apis.rmlconnect.net/wba/v1/messages';

 


    async handleIncomingMessage(createMessageDto: CreateMessageDto ): Promise<any> {
      // Simulate saving or processing the data
      console.log('Received message:', createMessageDto);
  
      // Here you could implement your logic, such as calling another service, saving to a database, etc.
      return { success: true, data: createMessageDto };
    }
  


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

  public async processMessage(requestDto: RequestDto) {
    // Implement your processing logic here
    console.log('Processing request:', requestDto);
    let poolConnection;
  
    try {
      poolConnection = await this.pool.connect();
      const request = new Request(poolConnection);
  
      // Ensure there's at least one message
      const firstMessage = requestDto.messages[0];
      if (!firstMessage) {
        throw new Error('No message found in the requestDto.');
      }
  
      // Use appropriate fields from the DTO
      request.input('Type', 4); // Adjust if needed
      request.input('id', uuidv4());
      // request.input('api_key', requestDto.apiKey); // Uncomment if apiKey is used
  
      request.input('From', firstMessage.from || null);
      request.input('MessageId', firstMessage.id || null);
      request.input('Timestamp', firstMessage.timestamp || null);
      request.input('type_voice', firstMessage.type || null);
      request.input('BrandMsisdn', requestDto.brand_msisdn || null);
      request.input('RequestId', requestDto.request_id || null);
  
      // Voice details
      const voice: VoiceDto = firstMessage.voice;
      if (voice) {
        request.input('VoiceId', voice.id || null);
        request.input('VoiceFile', voice.file || null);
        request.input('VoiceMimeType', voice.mime_type || null);
        request.input('VoiceSha256', voice.sha256 || null);
        request.input('VoiceMediaUrl', voice.media_url || null);
      } else {
        request.input('VoiceId', null);
        request.input('VoiceFile', null);
        request.input('VoiceMimeType', null);
        request.input('VoiceSha256', null);
        request.input('VoiceMediaUrl', null);
      }
  
      const result = await request.execute('InsertWebhookData');
      const insertedData = result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;
  
      // Get the auth token
      const authToken = await this.getAuthToken();
  
      // Prepare and send WhatsApp message
      const whatsappDto = {
        phone: `+91${firstMessage.from}`, // Ensure phone number formatting is correct
      };
  
      const whatsappResponse = await this.sendWhatsappMessage(whatsappDto);
      console.log('WhatsApp API Response:', whatsappResponse);
      console.log('Auth Token:', authToken);
  
      return insertedData;
    } catch (error) {
      console.log('Error inserting webhook data:', error);
      throw error;
    } finally {
      if (poolConnection) {
        await poolConnection.close();
      }
    }
  }


}
