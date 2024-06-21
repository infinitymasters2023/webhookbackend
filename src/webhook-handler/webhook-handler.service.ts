// src/webhook-handler/webhook-handler.service.ts
import { Injectable } from '@nestjs/common';
import { WebhookHandler } from './webhook-handler.interface';

@Injectable()
export class WebhookHandlerService implements WebhookHandler {
  async handleWebhook(payload: any): Promise<void> {
    // Implement the logic for handling the webhook
  }
}


