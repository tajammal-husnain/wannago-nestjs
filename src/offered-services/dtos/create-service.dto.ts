import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/service-categories/entities/category.entity';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Service name',
    description: 'Package name to display',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'Pack description',
    description: 'Package brief description if any',
  })
  description: string;

  @IsString()
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Package details in depth',
  })
  isAdditional: boolean;

  @IsString()
  @ApiProperty()
  isActive: true;

  @IsString()
  @ApiProperty()
  isDeleted: false;
}

export class UpdateServiceDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  price: string;

  @IsString()
  @IsOptional()
  categoryId: Category;

  @IsOptional()
  @IsBoolean()
  isAdditional: boolean;

  @IsString()
  @IsOptional()
  isActive: true;

  @IsString()
  @IsOptional()
  isDeleted: false;
}
