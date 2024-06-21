/* eslint-disable prettier/prettier */
// src/webhook-handler/webhook-handler.interface.ts

export interface WebhookHandler {
    handleWebhook(payload: any): Promise<void>;
  }