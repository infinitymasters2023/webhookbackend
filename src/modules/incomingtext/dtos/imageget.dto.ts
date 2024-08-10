/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { ImageMessageDto } from './imagemessage.dto';

export class CreateMessageDto {
  @ApiProperty()
  apiKey: string;

  @ApiProperty()
  messages: ImageMessageDto[];

  @ApiProperty()
  brand_msisdn: string;

  @ApiProperty()
  request_id: string;
}
/* eslint-disable prettier/prettier */
