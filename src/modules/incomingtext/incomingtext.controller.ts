/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { WebhookPayloadDto, WebhookRequestDto } from './incomingtext-payload.dto';

interface WebhookResponse {
  messageBody: string | null;
  from: string | null;
}

@Controller('incomingtext')
export class WebhookController {
  @Post()
  handleWebhook(@Body() payload: WebhookPayloadDto): WebhookResponse {
   // console.log('Received webhook payload:', payload);

    if (payload.messages && payload.messages.length > 0) {
      const firstMessage = payload.messages[0];
      console.log('Received message:', firstMessage.text.body);

      // Return an object with both the message body and the sender's information
      return {
        messageBody: firstMessage.text.body,
        from: firstMessage.from
      };
    }

    // Return an appropriate response if there are no messages
    return {
      messageBody: null,
      from: null
    };
  }
  // @Post()
  // handleWebhook(@Body() webhookRequestDto: WebhookRequestDto): string {
  //   return this.whatsappWebhookService.handleWebhook(webhookRequestDto);
  // }
}
