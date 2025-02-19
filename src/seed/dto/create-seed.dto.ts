import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateRegionDto {
  @IsString()
  @IsNotEmpty()
  regionName: string;

  @IsArray()
  cities: CreateCityDto[];
}

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  districts: CreateDistrictDto[];
}

export class CreateDistrictDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
