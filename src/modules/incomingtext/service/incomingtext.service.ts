/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConnectionPool, Request } from 'mssql';
import {    WhatsappDto } from '../dtos/incomingtext-payload.dto';
import axios from 'axios';
import { SendMessageDtoo, SendMessageDtoooo } from '../dtos/newimagesdtos';
import { CommonDTO } from '../dtos/commonall.dtos';



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
      request.input('Id', messageDto.id);
      request.input('FromPhoneNumber', messageDto.from);
      request.input('Timestamp', messageDto.timestamp);
      request.input('Type', messageDto.type);
      request.input('BrandMsisdn', requestDto.brand_msisdn);
      request.input('RequestId', requestDto.request_id);
      console.log('1')
      // Handle specific message types
      switch (messageDto.type) {
        case 'voice':
          const voice = messageDto.voice;
          if (voice) {
            request.input('VoiceFile', voice.file);
            request.input('VoiceId', voice.id);
            request.input('VoiceMimeType', voice.mime_type);
            request.input('VoiceSha256', voice.sha256);
            request.input('VoiceMediaUrl', voice.media_url);
            console.log('2')
          }
          break;
       
        case 'text':
          const text = messageDto.text;
          if (text) {
            request.input('TextBody', text.body);
            console.log('3')
          }
          break;

        case 'image':
          const image = messageDto.image;
          if (image) {
            request.input('ImageFile', image.file);
            request.input('ImageId', image.id);
            request.input('ImageMimeType', image.mime_type);
            request.input('ImageSha256', image.sha256);
            request.input('ImageMediaUrl', image.media_url);
            request.input('ImageCaption', image.caption);
            console.log('4')

          }
          break;

        case 'document':
          const document = messageDto.document;
          if (document) {
            request.input('DocumentFile', document.file);
            request.input('DocumentId', document.id);
            request.input('DocumentMimeType', document.mime_type);
            request.input('DocumentSha256', document.sha256);
            request.input('DocumentMediaUrl', document.media_url);
            request.input('DocumentCaption', document.caption);
            console.log('5')
          }
          break;
      }
      if (requestDto.contacts) {
        for (const contactDto of requestDto.contacts) {
          request.input('ContactProfileName', contactDto.profile.name);
          request.input('ContactWaId', contactDto.wa_id);
          console.log('6')
          // Execute SQL command to insert/update contact details
         // await request.execute('sp_InserAlltMessageDetails'); // Stored procedure name or SQL command
        }
      }
  
      // Execute SQL command to insert/update message details
      await request.execute('sp_InserAlltMessageDetails'); // Stored procedure name or SQL command
    }

    // Process each contact if available
  
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
  /******************************************************************************** */



}
