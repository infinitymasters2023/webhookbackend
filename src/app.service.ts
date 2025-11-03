import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  // A cron job that runs every day at 7:00 AM
  @Cron('0 7 * * *', { timeZone: 'Asia/Kolkata' }) // Adjust the time zone as needed
  handleCron() {
    this.logger.debug('Executing task at 7:00 AM every day');
    // Add your WhatsApp API task or any other logic here
  }
}
