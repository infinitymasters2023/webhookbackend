import {
    applyDecorators,
    SerializeOptions,
    SetMetadata,
    UseInterceptors,
} from '@nestjs/common';
import { ENUM_HELPER_FILE_TYPE } from 'src/helpers/constants/helper.enum.constant';
import {
    RESPONSE_EXCEL_TYPE_META_KEY,
    RESPONSE_MESSAGE_PATH_META_KEY,
    RESPONSE_MESSAGE_PROPERTIES_META_KEY,
    RESPONSE_SERIALIZATION_META_KEY,
} from 'src/helpers/constants/response.constant';
import { ResponseDefaultInterceptor } from 'src/helpers/interceptors/response.default.interceptor';
import { ResponsePagingInterceptor } from 'src/helpers/interceptors/response.paging.interceptor';
import {
    IResponseOptions,
    IResponsePagingOptions,
    IResponseExcelOptions,
} from 'src/helpers/interfaces/response.interface';

export function Response<T>(
    messagePath: string,
    options?: IResponseOptions<T>
): MethodDecorator {
    return applyDecorators(
        UseInterceptors(ResponseDefaultInterceptor<T>),
        SetMetadata(RESPONSE_MESSAGE_PATH_META_KEY, messagePath),
        SetMetadata(
            RESPONSE_SERIALIZATION_META_KEY,
            options ? options.serialization : undefined
        ),
        SetMetadata(
            RESPONSE_MESSAGE_PROPERTIES_META_KEY,
            options ? options.messageProperties : undefined
        )
    );
}

export function ResponseExcel(
    options?: IResponseExcelOptions<void>
): MethodDecorator {
    return applyDecorators(
        UseInterceptors(),
        SetMetadata(
            RESPONSE_SERIALIZATION_META_KEY,
            options ? options.serialization : undefined
        ),
        SetMetadata(
            RESPONSE_EXCEL_TYPE_META_KEY,
            options ? options.fileType : ENUM_HELPER_FILE_TYPE.CSV
        ),
        SetMetadata(
            RESPONSE_MESSAGE_PROPERTIES_META_KEY,
            options ? options.messageProperties : undefined
        )
    );
}

export function ResponsePaging<T>(
    messagePath: string,
    options?: IResponsePagingOptions<T>
): MethodDecorator {
    return applyDecorators(
        UseInterceptors(ResponsePagingInterceptor<T>),
        SetMetadata(RESPONSE_MESSAGE_PATH_META_KEY, messagePath),
        SetMetadata(
            RESPONSE_SERIALIZATION_META_KEY,
            options ? options.serialization : undefined
        ),
        SetMetadata(
            RESPONSE_MESSAGE_PROPERTIES_META_KEY,
            options ? options.messageProperties : undefined
        )
    );
}

export const ResponseSerializationOptions = SerializeOptions;
