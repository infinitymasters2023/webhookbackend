/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class ImageDto {
  @ApiProperty()
  file: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  mime_type: string;

  @ApiProperty()
  sha256: string;

  @ApiProperty()
  caption: string;

  @ApiProperty()
  media_url: string;
}
/* eslint-disable prettier/prettier */
