/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { GetmessageModule } from './modules/getmessage/getmessage.module'
import { HelperModule } from './helpers/helpers.module';
import { IncomingTextModule} from './modules/incomingtext/incomingtex.module'
import { DatabaseModule } from './common/database/database.module';
//import { WebhookHandlerModule } from './webhook-handler/webhook-handler.module';

@Module({
  imports: [ HelperModule, DatabaseModule, IncomingTextModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
