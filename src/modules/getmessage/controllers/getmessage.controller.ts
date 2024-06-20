import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetMessageService } from '../services/getmessage.service';
import { CreateMessageDto } from '../dtos/createMessage.dto';

@ApiTags('On premise API')
@Controller('v1/getmessage')
export class GetMessageController {
  constructor(private readonly messageService: GetMessageService) {}

  @Post('/createmessage')
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    const response = await this.messageService.getcreatemessage(createMessageDto.message);
    return {
      statusCode: 200,
      isSuccess: true,
      message: 'Message processed successfully',
      data: response,
    };
  }
}
