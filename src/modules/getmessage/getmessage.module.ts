import { Module } from '@nestjs/common';
import { GetMessageService } from 'src/modules/getmessage/services/getmessage.service';
import { GetMessageController } from 'src/modules/getmessage/controllers/getmessage.controller';
import { HelperService } from '../../helpers/services/helper.service';
@Module({
  imports: [],
  controllers: [GetMessageController],
  providers: [GetMessageService, HelperService],
})
export class GetmessageModule {}
