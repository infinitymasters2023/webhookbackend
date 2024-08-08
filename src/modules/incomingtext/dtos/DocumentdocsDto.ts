/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class DocumentdocsDto {
  @ApiProperty({
    description: 'Caption of the document',
   // example: '80skaraokesonglistartist',
  })
  caption: string;

  @ApiProperty({
    description: 'File path of the document',
  // example: '/usr/local/wamedia/shared/fc233119-733f-49c-bcbd-b2f68f798e33',
  })
  file: string;

  @ApiProperty({
    description: 'Unique identifier of the document',
  //  example: 'fc233119-733f-49c-bcbd-b2f68f798e33',
  })
  id: string;

  @ApiProperty({
    description: 'MIME type of the document',
   // example: 'application/pdf',
  })
  mime_type: string;

  @ApiProperty({
    description: 'SHA256 checksum of the document',
   // example: '3b11fa6ef2bde1dd14726e09d3eda220f6484f32d5d5caa4b8e',
  })
  sha256: string;

  @ApiProperty({
    description: 'Media URL of the document',
   // example: 'https://apis.rmlconnect.net/wba/v1/media?media_id=fc233119-733f-49c-bcbd-b2f68f798e33&username=demo',
  })
  media_url: string;
}
