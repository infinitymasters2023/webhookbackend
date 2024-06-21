/* eslint-disable prettier/prettier */
export class WebhookPayloadDto {
    messages: {
      id: string;
      from: string;
      type: string;
      timestamp: string;
      text: {
        body: string;
      };
      message_id: string;
    }[];
    contacts: {
      profile: {
        name: string;
      };
      wa_id: string;
    }[];
    brand_msisdn: string;
    request_id: string;
  }
  // src/dto/whatsapp-webhook.dto.ts
export class MessageDto {
  id: string;
  from: string;
  type: string;
  timestamp: number;
  text: {
    body: string;
  };
  message_id: string;
}

export class ContactDto {
  profile: {
    name: string;
  };
  wa_id: string;
}

export class WebhookRequestDto {
  messages: MessageDto[];
  contacts: ContactDto[];
  brand_msisdn: string;
  request_id: string;
}
