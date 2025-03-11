import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsEnum,
  IsArray,
  IsOptional,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
// import { Region } from 'src/seed/entities/regions.entity';
// import { City } from 'src/seed/entities/city.entity';
// import { District } from 'src/seed/entities/districts.entity';
import { UserRoleType } from '../constants/user-role-type';
import { IRateType } from '../constants/rate-type';
import { Exclude } from 'class-transformer';

abstract class BaseUserDTO {
  @ApiProperty({
    example: 'John',
    description: 'First name of the technician',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the technician',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Email address',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'hello@123',
    description: 'User Password',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(6)
  @Exclude()
  password: string;

  @IsEnum(UserRoleType)
  role: UserRoleType;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number',
  })
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: '1234 Main St, Apt 5',
    description: 'Primary address',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    example: 'f6034556-9cd1-4fa3-b2c2-6d225838a09e',
    description: 'Region of the technician',
  })
  @IsString()
  @IsOptional()
  region?: string;

  @ApiProperty({
    example: '5339e6b3-2dda-461c-999e-dd23b6320db7',
    description: 'District of the technician',
  })
  @IsString()
  @IsOptional()
  district?: string;

  @ApiProperty({
    example: '53a96060-0845-4d7d-903f-2fa21192a564',
    description: 'City of the technician',
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    example: '90001',
    description: 'ZIP code of the technician',
  })
  @IsString()
  @IsOptional()
  zipCode?: string;

  @ApiProperty({
    example: 'Pakistan',
    description: 'Country of the technician',
  })
  @IsString()
  @IsOptional()
  country?: string;
}

class AdminDTO extends BaseUserDTO {
  @ApiProperty({
    example: 'cee7681f-60c5-480c-8ee5-02c4181e6a09',
    description: 'Role id of the admin',
  })
  @IsString()
  roldeId?: string;
}

class CustomerDTO extends BaseUserDTO {
  @ApiProperty({
    example: '1',
    description: 'Customer referred by any user',
  })
  @IsOptional()
  @IsString()
  referredBy?: string;

  @ApiProperty({
    example: '1',
    description: 'Coupon code for discount',
  })
  @IsOptional()
  @IsString()
  couponCode?: string;

  @ApiProperty({
    example: '1',
    description: 'Package id to subscribe',
  })
  @IsOptional()
  @IsString()
  packageId?: string;

  @ApiProperty({
    example: '1',
    description: 'Duration id to subscribe',
  })
  @IsOptional()
  @IsString()
  durationId?: string;

  @ApiProperty({
    example: '1',
    description: 'Segment id to subscribe',
  })
  @IsOptional()
  @IsString()
  segmentId?: string;

  @ApiProperty({
    example: '1',
    description: 'Bill to pay for subscribed package',
  })
  @IsOptional()
  @IsString()
  billToPay?: string;

  @ApiProperty({
    example: '1',
    description: 'Profile picture in base64 form',
  })
  @IsOptional()
  @IsString()
  profilePicture?: string;
}

class TechnicianDTO extends BaseUserDTO {
  @ApiProperty({
    example: 'Electrician',
    description: 'Type of profession',
  })
  @IsOptional()
  @IsString()
  professionType?: string;

  @ApiProperty({
    example: 'Freelancer',
    description: 'Status of profession',
  })
  @IsOptional()
  @IsString()
  professionStatus?: string;

  @IsOptional()
  @IsEnum(IRateType)
  rateType?: IRateType;

  @ApiProperty({
    example: 20,
    description: 'Technician rate',
  })
  @IsOptional()
  @IsString()
  rate?: string;

  @ApiProperty({
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    description: 'Profile picture file',
  })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    description: 'Front side of identity file',
  })
  @IsOptional()
  @IsString()
  identityFileFront?: string;

  @ApiProperty({
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    description: 'Front side of identity file',
  })
  @IsOptional()
  @IsString()
  identityFileBack?: string;

  @ApiProperty({
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    description: 'Resume file in base64 format',
  })
  @IsOptional()
  @IsString()
  resumeFile?: string;

  @ApiProperty({
    example: ['English', 'Spanish'],
    description: 'Languages spoken',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @ApiProperty({
    example: ['HVAC', 'Electrical'],
    description: 'List of specialties',
  })
  @IsArray()
  public specialties: string[];

  @ApiProperty({
    example: ['Certified Electrician'],
    description: 'Certifications held',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certificates?: string[];

  @ApiProperty({
    example: 'All times',
    description: 'Technician availability details',
  })
  @IsOptional()
  @IsString()
  availability?: string;

  @ApiProperty({
    example: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    ],
    description: 'List of additional documents in base64 format',
  })
  @IsOptional()
  public additionalDocuments: Buffer[];
}

export { BaseUserDTO, AdminDTO, CustomerDTO, TechnicianDTO };
