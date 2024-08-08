/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { DocumentdocsDto } from './DocumentdocsDto'; // Adjust the path as needed

export class MessagedocsDto {
  @ApiProperty({
    description: 'Phone number of the sender',
   // example: '919941639697',
  })
  from: string;

  @ApiProperty({
    description: 'Unique identifier of the message',
  //  example: 'ABGGFlA5FpafAgo6tHcNmNjXmuSf',
  })
  id: string;

  @ApiProperty({
    description: 'Timestamp of the message',
  //  example: '1522189546',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Type of the message',
  //  example: 'document',
  })
  type: string;

  @ApiProperty({
    description: 'Document details',
    type: DocumentdocsDto,
  })
  document: DocumentdocsDto;
}
