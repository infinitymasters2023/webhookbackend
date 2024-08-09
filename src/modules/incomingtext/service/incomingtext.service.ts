/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConnectionPool, Request } from 'mssql';
import { MessageDto,   WhatsappDto } from '../dtos/incomingtext-payload.dto';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { MessagedocsDto } from '../dtos/MessagedocsDto';
import { MessagedocssDto } from '../dtos/DocumentdocsDto';
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
      // case 'document':
      //   return this.handledocsWebhook(message as MessagedocsDto);
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
      request.input('caption', messagedocsDto.document.caption || ''); // Use a default empty string if caption is missing
      request.input('file', messagedocsDto.document.file || ''); // Use a default empty string if file is missing
      request.input('mime_type', messagedocsDto.document.mime_type || ''); // Use a default empty string if mime_type is missing
      request.input('sha256', messagedocsDto.document.sha256 || ''); // Use a default empty string if sha256 is missing
      request.input('media_url', messagedocsDto.document.media_url || ''); // Use a default empty string if media_url is missing
  
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

  
  private readonly whatsappApiUrl = 'https://apis.rmlconnect.net/wba/v1/messages';

 

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


}
