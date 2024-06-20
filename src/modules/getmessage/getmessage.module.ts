import { Module } from '@nestjs/common';
import { GetMessageService } from 'src/modules/getmessage/services/getmessage.service';
import { GetMessageController } from 'src/modules/getmessage/controllers/getmessage.controller';
import { AuthService } from '../../helpers/services/auth.service';
@Module({
  imports: [],
  controllers: [GetMessageController],
  providers: [GetMessageService, AuthService],
})
export class GetmessageModule {}
