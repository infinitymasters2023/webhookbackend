/* eslint-disable prettier/prettier */
import { Controller, Inject, Post, Body, Get, HttpStatus } from '@nestjs/common';
import { WebhookPayloadDto } from '../dtos/incomingtext-payload.dto';
import { ConnectionPool } from 'mssql';
import { IncomingResponse } from '../dtos/incomingtext.response.interface';
import { IncomingTextService } from '../service/incomingtext.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessagedocsDto } from '../dtos/MessagedocsDto';
import { RequestDto } from '../dtos/DocumentdocsDto';
import { SendMessageDto, SendMessageDtoo, SendMessageDtoooo } from '../dtos/newimagesdtos';

@Controller('incoming')
export class IncomingtextController {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly pool: ConnectionPool,
    private readonly whatsappWebhookService: IncomingTextService,
  ) {}

  @Post('/text')
  async handleWebhook(@Body() payload: WebhookPayloadDto): Promise<IncomingResponse> {
    console.log('Received webhook payload:', payload);
    if (payload.messages && payload.messages.length > 0) {
      const firstMessage = payload.messages[0];
      console.log('Received message:', firstMessage.text.body);

      // Save the message using the service
      const result = await this.whatsappWebhookService.handleWebhook(firstMessage);
      console.log('Message saved with result:', result);

      return {
        messageBody: firstMessage.text.body,
        from: firstMessage.from,
      };
    }

    console.log('No messages found in the payload.');
    return {
      messageBody: null,
      from: null,
    };
  }

  @Get('login')
  @ApiOperation({ summary: 'Get authentication token' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved token' })
  async login(): Promise<string> {
    console.log('Login endpoint called');
    const token = await this.whatsappWebhookService.getAuthToken();
    console.log('Retrieved token:', token);
    return token;
  }

  @Post('send')
  @ApiOperation({ summary: 'Send WhatsApp message' })
  @ApiResponse({ status: 201, description: 'Message sent successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })


  @Post('documents')
  async handleDocumentsWebhook(@Body() messageDto: MessagedocsDto): Promise<any> {
    console.log('Received documents webhook payload:', messageDto);
    const result = await this.whatsappWebhookService.handledocsWebhook(messageDto);
    console.log('Documents webhook processed with result:', result);
    return result;
  }

 

  @Post('/Image')
  async createMessage(@Body() sendMessageDto: SendMessageDto): Promise<any> {
    console.log('SendMessageDto:', JSON.stringify(sendMessageDto, null, 2));
  
    // Handle the incoming image message and get the result
    const result = await this.whatsappWebhookService.handleIncomingImageMessage(sendMessageDto);
    console.log('Image URL processed with result:', JSON.stringify(result, null, 2));
  
    // Extract 'from' and 'image' from the first message in the DTO
    if (sendMessageDto.messages && sendMessageDto.messages.length > 0) {
      const { from, image } = sendMessageDto.messages[0];
  
      // Return success message with 'from', 'image', and the processed result
      return {
        statusCode: HttpStatus.OK,
        message: 'Image message processed successfully',
        data: {
          from,
          image,
          result
        }
      };
    } else {
      // Handle the case where no messages are present in the DTO
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'No messages found in the payload',
      };
    }
  }
  
  @Post('/senddd')
  async sendMessage(@Body() whatsappDto: SendMessageDtoo): Promise<any> {
    return this.whatsappWebhookService.sendMessage(whatsappDto);
  }

  @Post('/video')
  @ApiBody({ type: RequestDto })
  async handleMessages(@Body() requestDto: RequestDto): Promise<any> {
    console.log('Received video message payload:', requestDto);
    const result = await this.whatsappWebhookService.processMessage(requestDto);
    console.log('Video message processed with result:', result);
    return result;
  }
  @Post('/customsend')
  async sendMessagess(@Body() sendMessageDto: SendMessageDtoooo): Promise<any> {
    console.log('Received message:', sendMessageDto);
    return this.whatsappWebhookService.handlesendmessage(sendMessageDto);
  }
  
}
