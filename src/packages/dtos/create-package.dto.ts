import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePackageDto {
  @IsOptional()
  @IsString()
  segmentId?: string;

  @IsOptional()
  @IsString()
  packageName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  packageDetails?: string;

  @IsNumber()
  price: number;

  @IsOptional()
  packageServices?: any[]; // You can adjust the type based on your specific use case for services

  @IsOptional()
  packageDurations?: any[]; // Adjust the type based on your use case for durations

  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @IsBoolean()
  isDeleted: boolean;

  @IsBoolean()
  isActive: boolean;
}
