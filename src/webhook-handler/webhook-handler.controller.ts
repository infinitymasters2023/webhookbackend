// src/webhook-handler/webhook-handler.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { WebhookHandlerService } from './webhook-handler.service';

@Controller('webhook-handler')
export class WebhookHandlerController {
  constructor(private readonly webhookHandler: WebhookHandlerService) {}

  @Post()
  async handleWebhook(@Body() payload: any): Promise<string> {
    try {
      await this.webhookHandler.handleWebhook(payload);
    } catch (err) {
      console.error('Webhook handler error:', err.message);
      return 'Webhook Handler Error';
    }

    return 'Webhook received successfully';
  }
}
