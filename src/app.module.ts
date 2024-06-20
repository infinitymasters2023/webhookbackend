import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetmessageModule } from './modules/getmessage/getmessage.module'
import { HelperModule } from './helpers/helpers.module';

@Module({
  imports: [GetmessageModule, HelperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
