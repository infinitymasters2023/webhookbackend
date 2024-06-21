import { applyDecorators } from '@nestjs/common';
import { Doc } from 'src/helpers/doc/decorators/doc.decorator';
import { MessageLanguageSerialization } from 'src/helpers/serializations/message.language.serialization';

export function MessageEnumLanguageDoc(): MethodDecorator {
    return applyDecorators(
        Doc<MessageLanguageSerialization>('message.languages', {
            response: { serialization: MessageLanguageSerialization },
        })
    );
}
