import { applyDecorators, HttpStatus } from '@nestjs/common';
import { Doc, DocPaging } from 'src/helpers/doc/decorators/doc.decorator';
import { ResponseIdSerialization } from 'src/helpers/serializations/response.id.serialization';
import {
    RoleDocParamsGet,
    RoleDocQueryIsActive,
    RoleDocQueryType,
} from 'src/helpers/role/constants/role.doc.constant';
import { RoleGetSerialization } from 'src/helpers/role/serializations/role.get.serialization';
import { RoleListSerialization } from 'src/helpers/role/serializations/role.list.serialization';

export function RoleListDoc(): MethodDecorator {
    return applyDecorators(
        DocPaging<RoleListSerialization>('role.list', {
            auth: {
                jwtAccessToken: true,
            },
            request: {
                queries: [...RoleDocQueryIsActive, ...RoleDocQueryType],
            },
            response: {
                serialization: RoleListSerialization,
            },
        })
    );
}

export function RoleGetDoc(): MethodDecorator {
    return applyDecorators(
        Doc<RoleGetSerialization>('role.get', {
            auth: {
                jwtAccessToken: true,
            },
            request: {
                params: RoleDocParamsGet,
            },
            response: { serialization: RoleGetSerialization },
        })
    );
}

export function RoleCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc<ResponseIdSerialization>('role.create', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.CREATED,
                serialization: ResponseIdSerialization,
            },
        })
    );
}

export function RoleUpdateDoc(): MethodDecorator {
    return applyDecorators(
        Doc<ResponseIdSerialization>('role.update', {
            auth: {
                jwtAccessToken: true,
            },
            request: {
                params: RoleDocParamsGet,
            },
            response: { serialization: ResponseIdSerialization },
        })
    );
}

export function RoleDeleteDoc(): MethodDecorator {
    return applyDecorators(
        Doc<void>('role.delete', {
            auth: {
                jwtAccessToken: true,
            },
            request: {
                params: RoleDocParamsGet,
            },
        })
    );
}

export function RoleActiveDoc(): MethodDecorator {
    return applyDecorators(
        Doc<void>('role.active', {
            auth: {
                jwtAccessToken: true,
            },
            request: {
                params: RoleDocParamsGet,
            },
        })
    );
}

export function RoleInactiveDoc(): MethodDecorator {
    return applyDecorators(
        Doc<void>('role.inactive', {
            auth: {
                jwtAccessToken: true,
            },
            request: {
                params: RoleDocParamsGet,
            },
        })
    );
}
