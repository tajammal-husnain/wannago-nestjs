import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePackageDto {
  @ApiProperty({
    example: '068c11f9-679c-4165-9dcc-9fc5535142ec',
    description: 'Package Segment id selected for this package',
  })
  @IsString()
  segmentId?: string;

  @ApiProperty({
    example: 'Medium Package',
    description: 'Package name to display',
  })
  @IsOptional()
  @IsString()
  packageName?: string;

  @ApiProperty({
    example: 'Pack description',
    description: 'Package brief description if any',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'Pack details',
    description: 'Package details in depth',
  })
  @IsString()
  packageDetails?: string;

  @IsNumber()
  @ApiProperty({ example: '500', description: 'Package price to apply' })
  price: number;

  @ApiProperty({
    example: ['068c11f9-679c-4165-9dcc-9fc5535142ec'],
    description: 'Package services to apply',
  })
  packageServices?: any[]; // You can adjust the type based on your specific use case for services

  @ApiProperty({
    example: ['03c624c3-944d-4a9a-b883-fba898aebc61'],
    description: 'Package duration where its available',
  })
  packageDurations?: any[]; // Adjust the type based on your use case for durations

  @ApiProperty({
    example: 0,
    description: 'Package sorting order where we will show sequentially',
  })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
