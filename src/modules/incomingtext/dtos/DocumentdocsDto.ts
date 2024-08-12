/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class DocumentdocsDto {
  @ApiProperty()
  caption: string;

  @ApiProperty()
  file: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  mime_type: string;

  @ApiProperty()
  sha256: string;

  @ApiProperty()
  media_url: string;
}
export class MessageallDto {
  id: string;
  @ApiProperty()
  from: string;
  @ApiProperty()
  type: string;
  timestamp: string;
  text: {
    body: string;
  };
  message_id: string;
  brand_msisdn?: string;
  request_id?: string;
  name?: string;
  wa_id?: string;
}
export class MessagedocssDto {
  id: string;
  @ApiProperty()
  from: string;
  @ApiProperty()
  type: string;
}
export class VoiceDto {
  @ApiProperty()
  file: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  mime_type: string;

  @ApiProperty()
  sha256: string;

  @ApiProperty()
  media_url: string;
}

export class VideoMessageDto {
  @ApiProperty()
  from: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  type: string;

  @ApiProperty({ type: VoiceDto })
  voice: VoiceDto;
}

export class RequestDto {
  @ApiProperty({ type: [VideoMessageDto] })
  messages: VideoMessageDto[];

  @ApiProperty()
  brand_msisdn: string;

  @ApiProperty()
  request_id: string;
}