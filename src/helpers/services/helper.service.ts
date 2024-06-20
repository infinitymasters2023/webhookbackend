import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
// import * as handlebars from 'handlebars';
// import * as nodemailer from 'nodemailer';
@Injectable()
export class HelperService {
    private readonly logger = new Logger(HelperService.name);

    async sendWhatsAppMessage(phoneNumber: string, message: string): Promise<void> {
      try {
        const response = await axios.post(
          'https://your-whatsapp-api-url/messages',
          {
            to: phoneNumber,
            type: 'template',
            template: {
              name: 'your_template_name', // Replace with your actual template name
              language: { code: 'en_US' }, // Replace with your actual language code
              components: [
                {
                  type: 'body',
                  parameters: [
                    {
                      type: 'text',
                      text: message,
                    },
                  ],
                },
              ],
            },
          },
          {
            headers: {
              'Authorization': `Bearer YOUR_API_TOKEN`, // Replace with your actual API token
              'Content-Type': 'application/json',
            },
          },
        );
        this.logger.log('WhatsApp message sent successfully:', response.data);
      } catch (error) {
        this.logger.error('Error sending WhatsApp message:', error);
        throw error;
      }
    }
  }

