/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { MessagedocsDto } from './MessagedocsDto'; // Adjust the path as needed

export class InsertWebhookdocsDataDto {
  @ApiProperty({
    description: 'API key for authentication',
  //  example: 'IfgKh@jHkB5%232roUt20nhVgfb!ll*mv12lSt',
  })
  apiKey: string;

  @ApiProperty({
    description: 'List of messages',
    type: [MessagedocsDto],
  })
  messages: MessagedocsDto[];

  @ApiProperty({
    description: 'Brand MSISDN',
  //  example: '97144501601',
  })
  brand_msisdn: string;

  @ApiProperty({
    description: 'Unique request identifier',
 //   example: 'aebeca32-f125-11eb-8c86-0242ac120007',
  })
  request_id: string;
}
