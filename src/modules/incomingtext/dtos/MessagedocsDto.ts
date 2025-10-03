/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { DocumentdocsDto } from './DocumentdocsDto'; // Adjust the path as needed

export class MessagedocsDto {
  @ApiProperty()
  from: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  document: DocumentdocsDto;
}
