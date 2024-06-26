import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Patch,
    Post,
    Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// import { AuthJwtAdminAccessProtected } from 'src/helpers/auth/decorators/auth.jwt.decorator';
import { STATUS_CODE } from 'src/helpers/constants/status-code.constant';
import { HelperService } from 'src/helpers/services/helper.service';
// import {
//     PaginationQuery,
//     PaginationQueryFilterInBoolean,
//     PaginationQueryFilterInEnum,
// } from 'src/helpers/decorators/pagination.decorator';
// import { PaginationListDto } from 'src/helpers/dtos/pagination.list.dto';
 
// import {
//     ENUM_POLICY_ACTION,
//     ENUM_POLICY_SUBJECT,
// } from 'src/helpers/policy/constants/policy.enum.constant';
// import { PolicyAbilityProtected } from 'src/helpers/policy/decorators/policy.decorator';
// import { RequestParamGuard } from 'src/helpers/decorators/request.decorator';
import {
    Response,
    ResponsePaging,
} from 'src/helpers/decorators/response.decorator';
import {
    IResponse,
    IResponsePaging,
} from 'src/helpers/interfaces/response.interface';
import { ResponseIdSerialization } from 'src/helpers/serializations/response.id.serialization';
import { ENUM_ROLE_TYPE } from 'src/helpers/role/constants/role.enum.constant';
import {
    ROLE_DEFAULT_AVAILABLE_ORDER_BY,
    ROLE_DEFAULT_AVAILABLE_SEARCH,
    ROLE_DEFAULT_IS_ACTIVE,
    ROLE_DEFAULT_ORDER_BY,
    ROLE_DEFAULT_ORDER_DIRECTION,
    ROLE_DEFAULT_PER_PAGE,
    ROLE_DEFAULT_TYPE,
} from 'src/helpers/role/constants/role.list.constant';
import { ENUM_ROLE_STATUS_CODE_ERROR } from 'src/helpers/role/constants/role.status-code.constant';
import {
    RoleAdminDeleteGuard,
    RoleAdminGetGuard,
    RoleAdminUpdateActiveGuard,
    RoleAdminUpdateGuard,
    RoleAdminUpdateInactiveGuard,
} from 'src/helpers/role/decorators/role.admin.decorator';
import { GetRole } from 'src/helpers/role/decorators/role.decorator';
import {
    RoleActiveDoc,
    RoleCreateDoc,
    RoleDeleteDoc,
    RoleGetDoc,
    RoleInactiveDoc,
    RoleListDoc,
    RoleUpdateDoc,
} from 'src/helpers/role/docs/role.admin.doc';
import { RoleCreateDto } from 'src/helpers/role/dtos/role.create.dto';
import { RoleRequestDto } from 'src/helpers/role/dtos/role.request.dto';
import { RoleUpdatePermissionDto } from 'src/helpers/role/dtos/role.update-permission.dto';
import { RoleUpdateDto } from 'src/helpers/role/dtos/role.update.dto';
import {
    RoleEntity,
} from 'src/helpers/role/repository/entities/role.entity';
import { RoleGetSerialization } from 'src/helpers/role/serializations/role.get.serialization';
import { RoleListSerialization } from 'src/helpers/role/serializations/role.list.serialization';
import { RoleService } from 'src/helpers/role/services/role.service';

@ApiTags('common.role.admin')
@Controller({
    version: '1',
    path: '/role',
})
export class RoleAdminController {
    constructor(
        private readonly paginationService: HelperService,
        private readonly roleService: RoleService
    ) {}

    // @RoleListDoc()
    // @ResponsePaging('role.list', {
    //     serialization: RoleListSerialization,
    // })
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.ROLE,
    //     action: [ENUM_POLICY_ACTION.READ],
    // })
    // @AuthJwtAdminAccessProtected()
    // @Get('/list')
    // async list(
    //     @PaginationQuery(
    //         ROLE_DEFAULT_PER_PAGE,
    //         ROLE_DEFAULT_ORDER_BY,
    //         ROLE_DEFAULT_ORDER_DIRECTION,
    //         ROLE_DEFAULT_AVAILABLE_SEARCH,
    //         ROLE_DEFAULT_AVAILABLE_ORDER_BY
    //     )
    //     { _search, _limit, _offset, _order }: PaginationListDto,
    //     @PaginationQueryFilterInBoolean('isActive', ROLE_DEFAULT_IS_ACTIVE)
    //     isActive: Record<string, any>,
    //     @PaginationQueryFilterInEnum('type', ROLE_DEFAULT_TYPE, ENUM_ROLE_TYPE)
    //     type: Record<string, any>
    // ): Promise<IResponsePaging> {
    //     const find: Record<string, any> = {
    //         ..._search,
    //         ...isActive,
    //         ...type,
    //     };

    //     const roles: RoleEntity[] = await this.roleService.findAll(find, {
    //         paging: {
    //             limit: _limit,
    //             offset: _offset,
    //         },
    //         order: _order,
    //     });

    //     const total: number = await this.roleService.getTotal(find);
    //     const totalPage: number = this.paginationService.totalPage(
    //         total,
    //         _limit
    //     );

    //     return {
    //         _pagination: { total, totalPage },
    //         data: roles,
    //     };
    // }

    // @RoleGetDoc()
    // @Response('role.get', {
    //     serialization: RoleGetSerialization,
    // })
    // @RoleAdminGetGuard()
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.ROLE,
    //     action: [ENUM_POLICY_ACTION.READ],
    // })
    // @AuthJwtAdminAccessProtected()
    // @RequestParamGuard(RoleRequestDto)
    // @Get('get/:role')
    // async get(@GetRole(true) role: RoleEntity): Promise<IResponse> {
    //     return { data: role };
    // }

    // @RoleCreateDoc()
    // @Response('role.create', {
    //     serialization: ResponseIdSerialization,
    // })
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.ROLE,
    //     action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.CREATE],
    // })
    // @AuthJwtAdminAccessProtected()
    // @Post('/create')
    // async create(
    //     @Body()
    //     { name, description, type, permissions }: RoleCreateDto
    // ): Promise<IResponse> {
    //     // const exist: boolean = await this.roleService.existByName(name);
    //     // if (exist) {
    //     //     throw new ConflictException({
    //     //         statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_EXIST_ERROR,
    //     //         message: 'role.error.exist',
    //     //     });
    //     // }

    //     try {
    //         // const create = await this.roleService.create({
    //         //     name,
    //         //     description,
    //         //     type,
    //         //     permissions,
    //         // });

    //         return {
    //             data: { _id:'' },
    //         };
    //     } catch (err: any) {
    //         throw new InternalServerErrorException({
    //             statusCode: STATUS_CODE.ERROR_UNKNOWN,
    //             message: 'http.serverError.internalServerError',
    //             _error: err.message,
    //         });
    //     }
    // }

    // @RoleUpdateDoc()
    // @Response('role.update', {
    //     serialization: ResponseIdSerialization,
    // })
    // @RoleAdminUpdateGuard()
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.ROLE,
    //     action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    // })
    // @AuthJwtAdminAccessProtected()
    // @RequestParamGuard(RoleRequestDto)
    // @Put('/update/:role')
    // async update(
    //     @GetRole() role: RoleDoc,
    //     @Body()
    //     { description }: RoleUpdateDto
    // ): Promise<IResponse> {
    //     try {
    //         // await this.roleService.update(role, { description });
    //     } catch (err: any) {
    //         throw new InternalServerErrorException({
    //             statusCode: STATUS_CODE.ERROR_UNKNOWN,
    //             message: 'http.serverError.internalServerError',
    //             _error: err.message,
    //         });
    //     }

    //     return {
    //         data: { _id: role._id },
    //     };
    // }

    // @RoleUpdateDoc()
    // @Response('role.updatePermission', {
    //     serialization: ResponseIdSerialization,
    // })
    // @RoleAdminUpdateGuard()
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.ROLE,
    //     action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    // })
    // @AuthJwtAdminAccessProtected()
    // @RequestParamGuard(RoleRequestDto)
    // @Put('/update/:role/permission')
    // async updatePermission(
    //     @GetRole() role: RoleDoc,
    //     @Body()
    //     { permissions, type }: RoleUpdatePermissionDto
    // ): Promise<IResponse> {
    //     try {
    //         // await this.roleService.updatePermissions(role, {
    //         //     permissions,
    //         //     type,
    //         // });
    //     } catch (err: any) {
    //         throw new InternalServerErrorException({
    //             statusCode: STATUS_CODE.ERROR_UNKNOWN,
    //             message: 'http.serverError.internalServerError',
    //             _error: err.message,
    //         });
    //     }

    //     return {
    //         data: { _id: role._id },
    //     };
    // }

    // @RoleDeleteDoc()
    // @Response('role.delete')
    // @RoleAdminDeleteGuard()
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.ROLE,
    //     action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.DELETE],
    // })
    // @AuthJwtAdminAccessProtected()
    // @RequestParamGuard(RoleRequestDto)
    // @Delete('/delete/:role')
    // async delete(@GetRole() role: RoleDoc): Promise<void> {
    //     try {
    //         // await this.roleService.delete(role);
    //     } catch (err: any) {
    //         throw new InternalServerErrorException({
    //             statusCode: STATUS_CODE.ERROR_UNKNOWN,
    //             message: 'http.serverError.internalServerError',
    //             _error: err.message,
    //         });
    //     }

    //     return;
    // }

    // @RoleInactiveDoc()
    // @Response('role.inactive')
    // @RoleAdminUpdateInactiveGuard()
    // @AuthJwtAdminAccessProtected()
    // @RequestParamGuard(RoleRequestDto)
    // @Patch('/update/:role/inactive')
    // async inactive(@GetRole() role: RoleDoc): Promise<void> {
    //     try {
    //         // await this.roleService.inactive(role);
    //     } catch (err: any) {
    //         throw new InternalServerErrorException({
    //             statusCode: STATUS_CODE.ERROR_UNKNOWN,
    //             message: 'http.serverError.internalServerError',
    //             _error: err.message,
    //         });
    //     }

    //     return;
    // }

    // @RoleActiveDoc()
    // @Response('role.active')
    // @RoleAdminUpdateActiveGuard()
    // @AuthJwtAdminAccessProtected()
    // @RequestParamGuard(RoleRequestDto)
    // @Patch('/update/:role/active')
    // async active(@GetRole() role: RoleDoc): Promise<void> {
    //     try {
    //         // await this.roleService.active(role);
    //     } catch (err: any) {
    //         throw new InternalServerErrorException({
    //             statusCode: STATUS_CODE.ERROR_UNKNOWN,
    //             message: 'http.serverError.internalServerError',
    //             _error: err.message,
    //         });
    //     }

    //     return;
    // }
}
