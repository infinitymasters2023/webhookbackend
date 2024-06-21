/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { WebhookPayloadDto } from './webhook-payload.dto';

interface WebhookResponse {
  messageBody: string | null;
  from: string | null;
}

@Controller('webhook')
export class WebhookController {
  @Post()
  handleWebhook(@Body() payload: WebhookPayloadDto): WebhookResponse {
    if (payload.messages && payload.messages.length > 0) {
      const firstMessage = payload.messages[0];
      console.log('Received message:', firstMessage.text.body);
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
}
