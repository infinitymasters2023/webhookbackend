/* eslint-disable prettier/prettier */
// whatsappreq.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // Correct import from @nestjs/axios
import { lastValueFrom } from 'rxjs';
import { ImageMessageDto } from '../dtos/whatsappreq.dto';

@Injectable()
export class WhatsappReqService {
  constructor(private readonly httpService: HttpService) {} // Inject HttpService

  async AllIncommingMessage(clientCallback: string, sendMessageDto: ImageMessageDto): Promise<any> {
    try {
      const url = clientCallback;

      // Log the request
      console.log('Sending data to:', url);
      console.log('Payload:', JSON.stringify(sendMessageDto, null, 2));

      // Send the data to the client callback URL
      const response = await lastValueFrom(
        this.httpService.post(url, sendMessageDto)
      );

      // Log and return the response
      console.log('Response from client callback:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error calling client callback URL:', error);
      throw error;
    }
  }
}
