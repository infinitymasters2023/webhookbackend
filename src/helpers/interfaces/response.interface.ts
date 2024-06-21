import { ClassConstructor } from 'class-transformer';
import { ENUM_HELPER_FILE_TYPE } from 'src/helpers/constants/helper.enum.constant';
import { IHelperFileRows } from 'src/helpers/interfaces/helper.interface';
import { IMessageOptionsProperties } from 'src/helpers/interfaces/message.interface';

export interface IResponseCustomPropertyMetadata {
    statusCode?: number;
    message?: string;
    messageProperties?: IMessageOptionsProperties;
}

// metadata
export interface IResponseMetadata {
    customProperty?: IResponseCustomPropertyMetadata;
    [key: string]: any;
}

// decorator options

export interface IResponseOptions<T> {
    serialization?: ClassConstructor<T>;
    messageProperties?: IMessageOptionsProperties;
}

export type IResponsePagingOptions<T> = IResponseOptions<T>;

export interface IResponseExcelOptions<T> extends IResponseOptions<T> {
    fileType?: ENUM_HELPER_FILE_TYPE;
}

// type
export interface IResponse {
    _metadata?: IResponseMetadata;
    statusCode?: number;
    isSuccess? : boolean ;
    message?: string;
    data: Record<string, any>;
}

export interface IResponsePagingPagination {
    totalPage: number;
    total: number;
}

export interface IResponsePaging {
    _metadata?: IResponseMetadata;
    _pagination: IResponsePagingPagination;
    data: Record<string, any>[];
}

export interface IResponseExcel {
    data: IHelperFileRows[];
}

// metadata
export interface IResponseDropDown {
    value: number; 
    label: string
}

export interface IBooleanResponse {
    data: boolean;
}