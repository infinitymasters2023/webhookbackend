/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Media {
  @ApiProperty({ description: 'The path or URL to the media file' })
  file: string;

  @ApiProperty({ description: 'Unique identifier for the media' })
  id: string;

  @ApiProperty({ description: 'MIME type of the media' })
  mime_type: string;

  @ApiProperty({ description: 'SHA256 hash of the media' })
  sha256: string;

  @ApiProperty({ description: 'URL to access the media' })
  media_url: string;

  @ApiPropertyOptional({ description: 'Optional caption for the media' })
  caption?: string;
}
export class audio extends Media {}

export class Voice extends Media {}
export class video extends Media {}

export class Image extends Media {}

export class Document extends Media {
  @ApiProperty({ description: 'Caption for the document' })
  caption: string;
}
export class SendChatMessageDto {
  @ApiProperty({ description: 'AiSensy project ID' })
  projectId: string;

  @ApiProperty({ description: 'Partner API key for the AiSensy project' })
  partnerApiKey: string; // ✅ Added dynamic partner API key

  @ApiProperty({ description: 'Recipient phone number in international format (e.g., +911234567890)' })
  to: string;

  @ApiPropertyOptional({
    description: 'Message type',
    enum: ['text', 'image', 'document', 'template'],
    default: 'text',
  })
  type?: 'text' | 'image' | 'document' | 'template';

  @ApiPropertyOptional({ description: 'Text message content (required if type is text)' })
  body?: string;

  @ApiPropertyOptional({ description: 'Image URL (required if type is image)' })
  imageLink?: string;

  @ApiPropertyOptional({ description: 'Document URL (required if type is document)' })
  documentLink?: string;

  @ApiPropertyOptional({ description: 'Caption for image or document' })
  caption?: string;

  @ApiProperty()
 employee_mid: number;
@ApiProperty()
       sender_name: string;

  template?: {
    name: string;
    language: { code: string };
    components?: Array<any>;
  };
}
export class TextMessage {
  @ApiProperty({ description: 'The body of the text message' })
  body: string;
}

export class Message {
  @ApiProperty({ description: 'Sender phone number' })
  from: string;

  @ApiProperty({ description: 'Unique identifier for the message' })
  id: string;

  @ApiProperty({ description: 'Timestamp of the message' })
  timestamp: string;

  @ApiProperty({ enum: ['voice','video', 'audio', 'text', 'image', 'document'], description: 'Type of the message' })
  type: 'voice' | 'audio' |  'video' | 'text' | 'image' | 'document';

  @ApiPropertyOptional({ type: Voice, description: 'Voice message details' })
  voice?: Voice;
  @ApiPropertyOptional({ type: audio, description: 'audio message details' })
  audio?: audio;

  @ApiPropertyOptional({ type: video, description: 'video message details' })
  video?: video;


  @ApiPropertyOptional({ type: TextMessage, description: 'Text message details' })
  text?: TextMessage;

  @ApiPropertyOptional({ type: Image, description: 'Image message details' })
  image?: Image;

  @ApiPropertyOptional({ type: Document, description: 'Document message details' })
  document?: Document;
}

export class ContactProfile {
  @ApiProperty({ description: 'Name of the contact' })
  name: string;
}

export class Contact {
  @ApiProperty({ type: ContactProfile, description: 'Profile of the contact' })
  profile: ContactProfile;

  @ApiProperty({ description: 'WhatsApp ID of the contact' })
  wa_id: string;
}

export class CommonDTO {
  @ApiPropertyOptional({ description: 'API key for authentication, optional' })
  apiKey?: string;

  @ApiProperty({ type: [Message], description: 'List of messages' })
  messages: Message[];

  @ApiPropertyOptional({ type: [Contact], description: 'List of contacts, optional' })
  contacts?: Contact[];

  @ApiProperty({ description: 'Brand’s MSISDN' })
  brand_msisdn: string;

  @ApiProperty({ description: 'Unique request identifier' })
  request_id: string;
}
