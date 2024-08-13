/* eslint-disable prettier/prettier */
import { IsString, IsArray,  ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ImageDto {
  @IsString()
  @ApiProperty()
  file: string;

  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  mime_type: string;

  @IsString()
  @ApiProperty()
  sha256: string;

  @IsString()
  @ApiProperty()
  caption?: string;

  @IsString()
  @ApiProperty()
  media_url?: string;
}

class MessageDto {
  @IsString()
  @ApiProperty()
  from: string;

  @IsString()
  @ApiProperty()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => ImageDto)
  image: ImageDto;

  @IsString()
  @ApiProperty()
  timestamp: string;

  @IsString()
  @ApiProperty()
  type: string;
}

export class SendMessageDto {
  @IsString()
  @ApiProperty()
  apiKey: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  messages: MessageDto[];

  @IsString()
  @ApiProperty()
  brand_msisdn: string;

  @IsString()
  @ApiProperty()
  request_id: string;
}
