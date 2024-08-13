/* eslint-disable prettier/prettier */
import { Controller, Inject, Post, Body, Get } from '@nestjs/common';
import { WebhookPayloadDto } from '../dtos/incomingtext-payload.dto';
import { ConnectionPool } from 'mssql';
import { IncomingResponse } from '../dtos/incomingtext.response.interface';
import { IncomingTextService } from '../service/incomingtext.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessagedocsDto } from '../dtos/MessagedocsDto';
import { MessagedocssDto, RequestDto } from '../dtos/DocumentdocsDto';
import { CreateMessageDto } from '../dtos/imageget.dto';
import { SendMessageDto } from '../dtos/newimagesdtos';

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
  // async sendMessage(@Body() payload: any): Promise<any> {
  //   console.log('Send message endpoint called with payload:', payload);
  //   const result = await this.whatsappWebhookService.sendMessage(payload);
  //   console.log('Send message result:', result);
  //   return result;
  // }

  @Post('documents')
  async handleDocumentsWebhook(@Body() messageDto: MessagedocsDto): Promise<any> {
    console.log('Received documents webhook payload:', messageDto);
    const result = await this.whatsappWebhookService.handledocsWebhook(messageDto);
    console.log('Documents webhook processed with result:', result);
    return result;
  }

  @Post('incoming')
  async handleIncomingMessage(@Body() messageDto: MessagedocssDto): Promise<any> {
    console.log('Received incoming message payload:', messageDto);
    const result = await this.whatsappWebhookService.processIncomingMessage(messageDto);
    console.log('Incoming message processed with result:', result);
    return result;
  }

  @Post('/Image')
  async createMessage(@Body() createMessageDto: CreateMessageDto): Promise<any> {
    console.log('Received image URL payload:', createMessageDto);

    // Assuming createMessageDto contains `clientCallback` and `messages` field
    const clientCallback = 'YOUR_CLIENT_CALLBACK_URL'; // Update with actual client callback URL if static
    const sendMessageDto: SendMessageDto = {
      apiKey: createMessageDto.apiKey,
      messages: createMessageDto.messages,
      brand_msisdn: createMessageDto.brand_msisdn,
      request_id: createMessageDto.request_id,
    };

    const result = await this.whatsappWebhookService.handleIncomingImageMessage(clientCallback, sendMessageDto);
    console.log('Image URL processed with result:', result);
    return result;
  }

  @Post('/video')
  @ApiBody({ type: RequestDto })
  async handleMessages(@Body() requestDto: RequestDto): Promise<any> {
    console.log('Received video message payload:', requestDto);
    const result = await this.whatsappWebhookService.processMessage(requestDto);
    console.log('Video message processed with result:', result);
    return result;
  }

  
}
