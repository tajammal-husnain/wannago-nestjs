import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseResponse } from 'src/shared/dtos/base-api-response';
import { RoleDto } from '../dtos/role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/seed/entities/permission.entity';
// import RolePermission from '../entities/role-permission.entity';
import { In, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async addRole(createRoleDto: RoleDto): Promise<BaseResponse> {
    console.log(
      `🚀 -- role.service.ts:8 -- createRoleDto is called:`,
      createRoleDto,
    );
    const { name, permissions } = createRoleDto;

    const rolePermissions = await this.permissionRepository.find({
      where: { id: In(permissions) },
    });

    const role = new Role();
    role.name = name;
    role.permissions = rolePermissions;
    const savedRole = await this.roleRepository.save(role);

    return { data: savedRole, message: `Role ${name} is saved successfully` };
  }

  async updateRole(id: string, roleDto: RoleDto): Promise<BaseResponse> {
    const { name, permissions } = roleDto;
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    if (name) {
      role.name = name;
    }

    if (permissions) {
      const rolePermissions = await this.permissionRepository.findBy({
        id: In(permissions),
      });
      role.permissions = rolePermissions;
    }
    const updatedRole = await this.roleRepository.save(role);

    return {
      data: updatedRole,
      message: `Role ${name} is updated successfully`,
    };
  }

  async getRoles(): Promise<BaseResponse> {
    const roles = await this.roleRepository.find({
      relations: ['permissions'],
    });
    return { data: roles, message: `List of all roles` };
  }
}
