// /* eslint-disable prettier/prettier */
// import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
// import { AuthJwtAccessGuard } from 'src/helpers/guards/auth.jwt-access.guard';
// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { RetailerEntity } from 'src/modules/retailer/repository/entities/retailer.entity';
// import { IRequestApp } from 'src/helpers/interfaces/request.interface';

// export const AuthJwtPayload = createParamDecorator(
//     (data: string, ctx: ExecutionContext): Record<string, any> => {
//         const { user } = ctx
//             .switchToHttp()
//             .getRequest<IRequestApp & { user: RetailerEntity }>();
//         return data ? user[data] : user;
//     }
// );

// export const AuthJwtToken = createParamDecorator(
//     (data: string, ctx: ExecutionContext): string => {
//         const { headers } = ctx.switchToHttp().getRequest<IRequestApp>();
//         const { authorization } = headers;
//         const authorizations: string[] = authorization.split(' ');

//         return authorizations.length >= 2 ? authorizations[1] : undefined;
//     }
// );

// export function AuthJwtAccessProtected(): MethodDecorator {
//     return applyDecorators(UseGuards(AuthJwtAccessGuard));
// }

// // export function AuthJwtUserAccessProtected(): MethodDecorator {
// //     return applyDecorators(
// //         UseGuards(AuthJwtAccessGuard, RolePayloadTypeGuard),
// //         SetMetadata(ROLE_TYPE_META_KEY, [ENUM_ROLE_TYPE.USER])
// //     );
// // }

// // export function RetailerAuthAccessProtected(): MethodDecorator {
// //     return applyDecorators(
// //         UseGuards(AuthJwtAccessGuard, RolePayloadTypeGuard),
// //         SetMetadata(ROLE_TYPE_META_KEY, [
// //             ENUM_ROLE_TYPE.SUPER_ADMIN,
// //             ENUM_ROLE_TYPE.ADMIN,
// //         ])
// //     );
// // }
