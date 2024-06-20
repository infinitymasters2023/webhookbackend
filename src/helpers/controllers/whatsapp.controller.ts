import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HelperService } from '../services/helper.service'; // Adjust path as per your structure
@ApiTags('WhatsApp Messaging Template API')
@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly helperService: HelperService) {}

  
  @Post('send-message')
  async sendMessage(@Body() body: { phoneNumber: string; message: string }) {
    try {
      await this.helperService.sendWhatsAppMessage(body.phoneNumber, body.message);
      return { statusCode: 200, isSuccess: true, message: 'WhatsApp message sent successfully' };
    } catch (error) {
      return { statusCode: 500, isSuccess: false, message: 'Failed to send WhatsApp message', error };
    }
  }
}
