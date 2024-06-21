import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { HelperArrayService } from 'src/helpers/services/helper.array.service';
import { HelperService } from 'src/helpers/services/helper.service';
import { IRequestApp } from 'src/helpers/interfaces/request.interface';

@Injectable()
export class MessageCustomLanguageMiddleware implements NestMiddleware {
    constructor(
        private readonly helperArrayService: HelperArrayService,
        private readonly messageService: HelperService
    ) {}

    async use(
        req: IRequestApp,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        let language: string = this.messageService.getLanguage();
        const availableLanguages: string[] =
            this.messageService.getAvailableLanguages();
        let customLang: string[] = [language];

        const reqLanguages: string = req.headers['x-custom-lang'] as string;
        if (reqLanguages) {
            const splitLanguage: string[] = reqLanguages
                .split(',')
                .map((val) => val.toLowerCase());
            const languages: string[] =
                this.helperArrayService.filterIncludeUniqueByArray(
                    availableLanguages,
                    splitLanguage
                );

            if (languages.length > 0) {
                language = languages.join(',');
                customLang = languages;
            }
        }

        req.__customLang = customLang;
        req.__xCustomLang = language;
        req.headers['x-custom-lang'] = language;

        next();
    }
}
