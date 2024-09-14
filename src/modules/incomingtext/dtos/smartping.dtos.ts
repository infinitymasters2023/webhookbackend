/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class MessageContentDto {
  @ApiProperty({ description: 'Text content of the message' })
  text: string;

  @ApiProperty({ description: 'Caption for the media' })
  caption: string;

  @ApiProperty({ description: 'URL of the media' })
  url: string;

  @ApiProperty({ description: 'Expiry date of the URL' })
  urlExpiry: string; // You might want to use a date type if this is a date
}

export class WhatsAppConversationDetailsDto {
  @ApiProperty({ description: 'ID of the WhatsApp conversation' })
  id: string;

  @ApiProperty({ description: 'Type of the WhatsApp conversation' })
  type: string;
}

export class MessageDto {
  @ApiProperty({ description: 'Type of the message' })
  type: string;

  @ApiProperty({ description: 'Unique ID of the message' })
  id: string;

  @ApiProperty({ description: 'Phone number associated with the message' })
  phone_number: string;

  @ApiProperty({ description: 'Contact ID associated with the message' })
  contact_id: string;

  @ApiProperty({ description: 'Campaign related to the message', nullable: true })
  campaign: string | null;

  @ApiProperty({ description: 'Sender of the message' })
  sender: string;

  @ApiProperty({ description: 'Content of the message' })
  message_content: MessageContentDto;

  @ApiProperty({ description: 'Type of the message' })
  message_type: string;

  @ApiProperty({ description: 'Status of the message' })
  status: string;

  @ApiProperty({ description: 'Indicates if the message is an HSM' })
  is_HSM: boolean;

  @ApiProperty({ description: 'Chatbot response to the message', nullable: true })
  chatbot_response: string | null;

  @ApiProperty({ description: 'ID of the agent who sent the message' })
  agent_id: string;

  @ApiProperty({ description: 'Timestamp when the message was sent' })
  sent_at: number;

  @ApiProperty({ description: 'Timestamp when the message was delivered' })
  delivered_at: number;

  @ApiProperty({ description: 'Timestamp when the message was read' })
  read_at: number;

  @ApiProperty({ description: 'Failure response if any', nullable: true })
  failureResponse: string | null;

  @ApiProperty({ description: 'Username associated with the message' })
  userName: string;

  @ApiProperty({ description: 'Country code of the sender' })
  countryCode: string;

  @ApiProperty({ description: 'Submitted message ID', nullable: true })
  submitted_message_id: string | null;

  @ApiProperty({ description: 'Price of the message' })
  message_price: number;

  @ApiProperty({ description: 'Type of deduction applied' })
  deductionType: string;

  @ApiProperty({ description: 'MAU details', nullable: true })
  mau_details: string | null;

  @ApiProperty({ description: 'Details of the WhatsApp conversation' })
  whatsapp_conversation_details: WhatsAppConversationDetailsDto;

  @ApiProperty({ description: 'Context of the message', nullable: true })
  context: string | null;

  @ApiProperty({ description: 'WhatsApp message ID' })
  messageId: string;
}
