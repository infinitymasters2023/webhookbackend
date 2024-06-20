import { Global, Module } from '@nestjs/common';
import { HelperService } from 'src/helpers/services/helper.service';
import { WhatsAppController } from './controllers/whatsapp.controller';
@Global()
@Module({
    providers: [HelperService],
    exports: [ HelperService],
    controllers: [WhatsAppController],
    imports: [],
})
export class HelperModule { }
