import { Global, Module } from '@nestjs/common';
import { HelperService } from 'src/helpers/services/helper.service';
import { I18nService } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
@Global()
@Module({
    providers: [HelperService],
    exports: [ HelperService],
    controllers: [],
    imports: [],
})
export class HelperModule { }
