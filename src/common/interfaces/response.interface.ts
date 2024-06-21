
export interface IResponse {
    statusCode?: number;
    isSuccess?: boolean;
    message?: string;
    data: Record<string, any>;
}

export interface IResponsePagingPagination {
    totalPage: number;
    total: number;
}

export interface IResponsePaging extends IResponse {
    _pagination: IResponsePagingPagination;
}

export interface IResponseDropDown {
    value: number;
    label: string
}

export interface IBooleanResponse {
    data: boolean;
}