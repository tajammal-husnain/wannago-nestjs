import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { RoleDto } from '../dtos/role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async addRole(@Body() createRoleDto: RoleDto) {
    return await this.roleService.addRole(createRoleDto);
  }

  @Put(':id')
  async updateRole(@Query('id') id: string, @Body() updateRole: RoleDto) {
    return this.roleService.updateRole(id, updateRole);
  }

  @Get()
  async getRoles() {
    return await this.roleService.getRoles();
  }
}
