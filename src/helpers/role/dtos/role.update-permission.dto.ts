import { OmitType } from '@nestjs/swagger';
import { RoleCreateDto } from 'src/helpers/role/dtos/role.create.dto';

export class RoleUpdatePermissionDto extends OmitType(RoleCreateDto, [
    'name',
] as const) {}
