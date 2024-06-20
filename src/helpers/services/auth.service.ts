import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  async login(loginDto: LoginDto): Promise<any> {
    try {
      const response = await axios.post('https://apis.rmlconnect.net/auth/v1/login/', loginDto, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.logger.log('Login successful:', response.data);
      return response.data;
    } catch (error) {
      this.logger.error('Error during login:', error);
      throw error;
    }
  }
}