import { Injectable, Logger } from '@nestjs/common';
import { CreateMessageDto } from '../dtos/createMessage.dto';
import axios from 'axios';

@Injectable()
export class GetMessageService {
  private readonly logger = new Logger(GetMessageService.name);
  async getcreatemessage(inputMessage: string): Promise<string> {
    try {
      const greetings = ['hi', 'hey', 'hello'];
      const normalizedMessage = inputMessage.toLowerCase().trim();
      if (greetings.some(greeting => normalizedMessage.startsWith(greeting))) {
        return 'Hi, Welcome to Infinity Assurance on behalf of Future Generali. How may I help you?';
      } else if (normalizedMessage.startsWith('policy')) {
        return 'Please provide your policy number for further assistance.';
      } else if (normalizedMessage.startsWith('claim')) {
        return 'Please provide your claim ID for further assistance.';
      } else {
        return 'I am sorry, I did not understand that. Can you please rephrase?';
      }
      
    } catch (error) {
      throw error;
    }
  }
}