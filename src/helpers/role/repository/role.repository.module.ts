import { Module } from '@nestjs/common';

import {
    RoleEntity,
} from 'src/helpers/role/repository/entities/role.entity';
import { RoleRepository } from 'src/helpers/role/repository/repositories/role.repository';

@Module({
    providers: [RoleRepository],
    exports: [RoleRepository],
    controllers: [],
    imports: [
    ],
})
export class RoleRepositoryModule {}
