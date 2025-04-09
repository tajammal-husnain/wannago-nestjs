import { IsArray, IsString } from 'class-validator';
import { Permission } from 'src/seed/entities/permission.entity';

export class RoleDto {
  @IsString()
  name: string;

  @IsArray()
  permissions: Permission[];
}
