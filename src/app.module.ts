import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetmessageModule } from './modules/getmessage/getmessage.module'
import { AuthModule } from './helpers/auth.module';

@Module({
  imports: [GetmessageModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
