/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WhatsappReqController } from './controller/whatsppreq.controller';
import { DatabaseModule } from '../../common/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { HelperService } from 'src/helpers/services/helper.service';
import { WhatsappReqService } from './service/whatsappreq.service';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule

@Module({
  imports: [
    DatabaseModule,
    HttpModule, // Add HttpModule here
    JwtModule.register({
      signOptions: { /* your JWT options here */ },
    }),
  ],
  controllers: [WhatsappReqController],
  providers: [HelperService, WhatsappReqService],
})
export class WhatsappReqModule {}
