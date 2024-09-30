import { ApiProperty } from "@nestjs/swagger";

export class MessageStatusUpdatedDto {
  id: string; // Unique identifier of the message DTO
  created_at: string; // Timestamp of when the DTO was created
  topic: string; // Event type or topic, in this case, 'message.status.updated'
  project_id: string; // ID of the project
  delivery_attempt: string; // Delivery attempt count
  data: MessageData; // Nested object containing message data
}

export class MessageData {
  message: Message; // Object that holds message details
}

export class Message {
  type: string; // Message type, e.g., 'message'
  id: string; // Unique identifier for the message
  meta_data: any[]; // Metadata for the message
  project_id: string; // ID of the project to which the message belongs
  phone_number: string; // WhatsApp phone number of the contact
  contact_id: string; // Contact ID for identifying the contact
  campaign?: Campaign | null; // Optional campaign details if any
  sender: 'SYSTEM' | 'AGENT' | 'USER' | 'API'; // Sender of the message
  message_content?: MessageContent | null; // Optional message content object
  message_type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'FILE' | 'AUDIO' | 'STICKER' | 'LOCATION' | 'CONTACT' | 'BUTTON_REPLY' | 'LIST_REPLY'; // Message type
  status: 'SENT' | 'DELIVERED' | 'READ'; // Status of the message
  is_HSM: boolean; // Whether the message is a template (HSM)
  chatbot_response?: ChatbotResponse | null; // Optional chatbot response object
  agent_id?: string | null; // Optional agent ID if sent by an agent
  sent_at?: number | null; // Timestamp of when the message was sent
  delivered_at?: number | null; // Timestamp of when the message was delivered
  read_at?: number | null; // Optional timestamp of when the message was read
  failureResponse?: FailureResponse | null; // Optional failure response object
  userName?: string; // Name of the contact
  countryCode?: string; // Country code of the contact
  submitted_message_id?: string | null; // ID of the submitted message
  message_price: number; // Message cost or price (in this case, it's zero)
  deductionType?: 'MAU' | 'WC' | null; // Optional deduction type for credit usage
  mau_details?: MAUDetails | null; // Optional MAU details object
  whatsapp_conversation_details?: WhatsAppConversationDetails | null; // Optional WhatsApp conversation details
  context?: any | null; // Optional context object
  messageId: string; // Message ID for WhatsApp
}

export class Campaign {
  name: string; // Campaign name
  campaign_id: string; // Unique identifier for the campaign
}

export class MessageContent {
  @ApiProperty({ example: 'TEST REPLY', required: true })
  text: string;

  @ApiProperty({ example: 'This is a caption', required: false })
  caption?: string;

  @ApiProperty({ example: 'https://example.com', required: false })
  url?: string;

  @ApiProperty({ example: '2024-09-28T23:59:59Z', required: false })
  urlExpiry?: string;
}

export class ChatbotResponse {
  query_text?: string; // Text sent to the chatbot
  intent?: string; // Intent identified by the chatbot
}

export class FailureResponse {
  reason?: string; // Reason for failure
}

export class MAUDetails {
  session_period: number; // Timestamp for the billing cycle start
  session_created_on: number; // Timestamp when the session was created
  session_created_by: 'USER' | 'BUSINESS'; // Whether it was created by the user or business
  current_plan: string; // Current plan for the project
}

export class WhatsAppConversationDetails {
  id: string; // Unique identifier for the WhatsApp conversation
  type: 'USER' | 'BUSINESS'; // Type of deduction (user or business)
  expiresAt?: number; // Expiration timestamp for the conversation
}
