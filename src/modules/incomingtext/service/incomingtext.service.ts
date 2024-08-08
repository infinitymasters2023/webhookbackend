/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConnectionPool, Request } from 'mssql';
import { MessageDto,   WhatsappDto } from '../dtos/incomingtext-payload.dto';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { MessagedocsDto } from '../dtos/MessagedocsDto';
import { MessageInfoDto } from '../dtos/DocumentdocsDto';

@Injectable()
export class IncomingTextService {
  private readonly authApiUrl = 'https://apis.rmlconnect.net/auth/v1/login/';
  private readonly username = 'InfinityAssuranc';
  private readonly password = 'w$LzFe@72';

  constructor(
    @Inject('DATABASE_CONNECTION') private readonly pool: ConnectionPool,
  ) {}
  // public async getAuthToken(): Promise<string> {
  //   try {
  //     const payloadObject = {
  //       username: this.username,
  //       password: this.password,
  //     };

  //     const response = await axios.post(this.authApiUrl, payloadObject, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       },
  //     });

  //     const token = response.data.JWTAUTH; 

  //     if (!token) {
  //       throw new Error('Token not found in the response');
  //     }

  //     console.log('Retrieved Auth Token:', token);
  //     return token;
  //   } catch (error) {
  //     console.error('Error getting auth token:', error);
  //     throw new HttpException(
  //       error.response?.data || 'An error occurred while retrieving token',
  //       error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
  //     );
  //   }
  // }
  public async handleIncomingMessage(
    messageInfoDto: MessageInfoDto,
    messageDto: MessageDto,
    messagedocsDto: MessagedocsDto
): Promise<any> {
    // Log the incoming DTOs to debug
    console.log('messageInfoDto:', messageInfoDto);
    console.log('messageDto:', messageDto);
    console.log('messagedocsDto:', messagedocsDto);

    // Generate the auth token
    const authToken = await this.getAuthToken();

    // Destructure type and from fields, provide defaults
    const { type = 'text', from = '9582293150' } = messageInfoDto || {};

    console.log('type:', type); // Log the type
    console.log('from:', from); // Log the from

    if (type === 'text') {
        if (!messageDto.from) {
            messageDto.from = from; // Ensure 'from' is set
        }
        console.log('type4444444:', type); // Log the type
        return this.handleWebhook(messageDto);
    } else if (type === 'document') {
        if (!messagedocsDto.from) {
            messagedocsDto.from = from; // Ensure 'from' is set
        }
        console.log('type55555555555555:', type); // Log the type
        return this.handledocsWebhook(messagedocsDto);
    } else {
        throw new HttpException('Unsupported message type', HttpStatus.BAD_REQUEST);
    }
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
    let poolConnection;
    try {
      poolConnection = await this.pool.connect();
      const request = poolConnection.request();
      request.input('type', 2); // Assuming '2' is for document type
      request.input('id', uuidv4());
      request.input('from', messagedocsDto.from);       
      request.input('message_id', messagedocsDto.id);
    //  request.input('timestamp', messageDto.timestamp);
      // request.input('brand_msisdn', messageDto.brand_msisdn);
      // request.input('request_id', messageDto.request_id);
      request.input('name', ''); // Assuming name is not in MessagedocsDto, adjust as necessary
      request.input('wa_id', ''); // Assuming wa_id is not in MessagedocsDto, adjust as necessary
      request.input('caption', messagedocsDto.document.caption);
      request.input('file', messagedocsDto.document.file);
    //  request.input('id_docs', messageDto.document.id);
      request.input('mime_type', messagedocsDto.document.mime_type);
      request.input('sha256', messagedocsDto.document.sha256);
      request.input('media_url', messagedocsDto.document.media_url);

      const result = await request.execute('InsertWebhookData');
      const insertedData = result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;

      // Get the auth token
      const authToken = await this.getAuthToken();

      // Use the 'from' and 'document' values along with the auth token
      console.log('From:', messagedocsDto.from);
      console.log('Message ID:', messagedocsDto.id);
      console.log('Timestamp:', messagedocsDto.timestamp);
      // console.log('Brand MSISDN:', messageDto.brand_msisdn);
      // console.log('Request ID:', messageDto.request_id);
      console.log('Document Caption:', messagedocsDto.document.caption);
      console.log('Document File:', messagedocsDto.document.file);
      console.log('Document ID:', messagedocsDto.document.id);
      console.log('Document MIME Type:', messagedocsDto.document.mime_type);
      console.log('Document SHA256:', messagedocsDto.document.sha256);
      console.log('Document Media URL:', messagedocsDto.document.media_url);
      console.log('Auth Token:', authToken);
      console.log('Inserted Data:', insertedData);

     const whatsappDto: WhatsappDto = {
       phone: `+91${messagedocsDto.from}`,
       };
      console.log('Phone number:', messagedocsDto.from);

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
