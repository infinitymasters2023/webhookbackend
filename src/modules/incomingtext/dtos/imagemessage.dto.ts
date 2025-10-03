/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { ImageDto } from './image.dto';

export class ImageMessageDto {
  @ApiProperty()
  from: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  image: ImageDto;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  type: string;
}
/* eslint-disable prettier/prettier */
