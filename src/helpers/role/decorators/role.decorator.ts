import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequestApp } from 'src/helpers/interfaces/request.interface';
import {
    RoleEntity,
} from 'src/helpers/role/repository/entities/role.entity';

export const GetRole = createParamDecorator(
    (returnPlain: boolean, ctx: ExecutionContext): RoleEntity => {
        const { __role } = ctx
            .switchToHttp()
            .getRequest<IRequestApp & { __role: RoleEntity }>();
        // return returnPlain ? __role.toObject() : __role;
        return returnPlain ? __role : __role;
    }
);
