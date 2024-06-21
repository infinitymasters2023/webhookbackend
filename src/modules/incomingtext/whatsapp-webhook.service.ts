/* eslint-disable prettier/prettier */
// src/whatsapp-webhook/whatsapp-webhook.service.ts
import { Injectable } from '@nestjs/common';
import { WebhookRequestDto } from './incomingtext-payload.dto';

@Injectable()
export class WhatsappWebhookService {
  handleWebhook(data: WebhookRequestDto): string {
    // Add your business logic here
    console.log('Received WhatsApp message:', data);
    return 'Webhook received successfully';
  }
}
