/* eslint-disable prettier/prettier */
import { Controller,Inject, Post, Body ,Get} from '@nestjs/common';
import {  WebhookPayloadDto } from '../dtos/incomingtext-payload.dto';
import { ConnectionPool } from 'mssql';
import { IncomingResponse } from '../dtos/incomingtext.response.interface';
import { IncomingTextService } from '../service/incomingtext.service';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessagedocsDto } from '../dtos/MessagedocsDto';
import { MessagedocssDto } from '../dtos/DocumentdocsDto';
import { CreateMessageDto } from '../dtos/imageget.dto';




@Controller('incoming')
export class IncomingtextController {

  constructor(@Inject('DATABASE_CONNECTION') 
  private readonly pool: ConnectionPool, 
  private readonly whatsappWebhookService: IncomingTextService) 
  {}





  @Post('/text')
  async handleWebhook(@Body() payload: WebhookPayloadDto): Promise<IncomingResponse> {
    if (payload.messages && payload.messages.length > 0) {
      const firstMessage = payload.messages[0];
      console.log('Received message:', firstMessage.text.body);

      // Save the message using the service
      await this.whatsappWebhookService.handleWebhook(firstMessage);

      return {
        messageBody: firstMessage.text.body,
        from: firstMessage.from
      };
    }

    return {
      messageBody: null,
      from: null
    };
  }


  @Get('login')
  @ApiOperation({ summary: 'Get authentication token' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved token' })
  async login(): Promise<string> {
    return this.whatsappWebhookService.getAuthToken();
  }

  @Post('send')
  @ApiOperation({ summary: 'Send WhatsApp message' })
  @ApiResponse({ status: 201, description: 'Message sent successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })

  // @Post('/image')
  // create(@Body() createMessageDto: CreateMessageDto) {

    
  //   // Handle the incoming request here
  //   console.log(createMessageDto);
  //   return { status: 'success', data: createMessageDto };
  // }

  @Post('documents')
 
  async handleDocumentsWebhook(@Body() messageDto: MessagedocsDto): Promise<any> {
    return this.whatsappWebhookService.handledocsWebhook(messageDto);
  }
  @Post('incoming')
  async handleIncomingMessage(@Body() messageDto:  MessagedocssDto) {
    return this.whatsappWebhookService.processIncomingMessage(messageDto);
  }
  @Post('/imageurl')
  async createMessage(@Body() createMessageDto: CreateMessageDto ): Promise<any> {
    return this.whatsappWebhookService.handleIncomingImageMessage(createMessageDto);
  }
}