/* eslint-disable prettier/prettier */
// whatsppreq.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { WhatsappReqService } from '../service/whatsappreq.service';
import { ImageMessageDto } from '../dtos/whatsappreq.dto';

@Controller('/whatsappreq')
export class WhatsappReqController {
  constructor(private readonly whatsappReqService: WhatsappReqService) {}

  @Post('/all')
  async handleAllIncommingMessages(@Body() createMessageDto: ImageMessageDto): Promise<any> {
    
    console.log('Received message payload:', JSON.stringify(createMessageDto, null, 2));

   
  }

}
