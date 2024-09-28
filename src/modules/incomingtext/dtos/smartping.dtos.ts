/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class MessageContentDto {
  @ApiProperty({ example: 'TEST REPLY', required: true })
  text: string;

  @ApiProperty({ example: 'This is a caption', required: false })
  caption?: string;

  @ApiProperty({ example: 'https://example.com', required: false })
  url?: string;

  @ApiProperty({ example: '2024-09-28T23:59:59Z', required: false })
  urlExpiry?: string;
}

export class WhatsappConversationDetailsDto {
  @ApiProperty({ example: 'a8415e69208143fa668010e837ed3f82' })
  id: string;

  @ApiProperty({ example: 'UTILITY' })
  type: string;
}

export class MessageDto {
  @ApiProperty({ example: 'message' })
  type: string;

  @ApiProperty({ example: '666c242e672bf60eb436be13' })
  id: string;

  @ApiProperty({ example: [] })
  meta_data: any[];

  @ApiProperty({ example: '6337cc42be7532606c705fce' })
  project_id: string;

  @ApiProperty({ example: '918116856153' })
  phone_number: string;

  @ApiProperty({ example: '656f4637c9373231243f0351' })
  contact_id: string;

  @ApiProperty({ example: null })
  campaign: string | null;

  @ApiProperty({ example: 'AGENT' })
  sender: string;

  @ApiProperty({ type: MessageContentDto })
  message_content: MessageContentDto;

  @ApiProperty({ example: 'TEXT' })
  message_type: string;

  @ApiProperty({ example: 'READ' })
  status: string;

  @ApiProperty({ example: false })
  is_HSM: boolean;

  @ApiProperty({ example: null })
  chatbot_response: any | null;

  @ApiProperty({ example: '6337cc42be7532606c705fcd' })
  agent_id: string;

  @ApiProperty({ example: 1718363181280 })
  sent_at: number;

  @ApiProperty({ example: 1718363183000 })
  delivered_at: number;

  @ApiProperty({ example: 1718363261000 })
  read_at: number;

  @ApiProperty({ example: null })
  failureResponse: any | null;

  @ApiProperty({ example: 'qwerty' })
  userName: string;

  @ApiProperty({ example: '91' })
  countryCode: string;

  @ApiProperty({ example: '' })
  submitted_message_id: string;

  @ApiProperty({ example: 0 })
  message_price: number;

  @ApiProperty({ example: 'WC' })
  deductionType: string;

  @ApiProperty({ example: null })
  mau_details: any | null;

  @ApiProperty({ type: WhatsappConversationDetailsDto })
  whatsapp_conversation_details: WhatsappConversationDetailsDto;

  @ApiProperty({ example: null })
  context: any | null;

  @ApiProperty({ example: 'wamid.HBgMOTE4MTE2ODU2MTUzFQIAERgSMzMwRDVFQTM2QTkwQzA4RTJFAA==' })
  messageId: string;
}
