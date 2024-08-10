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