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
export class CreateSegmentDto {
  @IsString()
  @IsNotEmpty()
  segmentName: string;

  @IsString()
  @IsNotEmpty()
  segmentCode: string;

  @IsString()
  @IsNotEmpty()
  segmentDescription: string;
}

export class CreateDurationDto {
  @IsString()
  @IsNotEmpty()
  durationType: string;

  @IsString()
  @IsNotEmpty()
  durationCode: string;
}
