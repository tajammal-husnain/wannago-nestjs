import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RoleService } from './services/role.service';
import { RoleController } from './controller/role.controller';
import { Permission } from 'src/seed/entities/permission.entity';
// import RolePermission from './entities/role-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
