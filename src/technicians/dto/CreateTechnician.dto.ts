/* eslint-disable @typescript-eslint/no-unused-vars */
// import { IsEmail, IsString, IsArray, IsBase64 } from 'class-validator';
// import TechnicianAvailability from './TechnicianAvailability.dto';

// export default class CreateTechnicianInput {
//   @IsString()
//   public firstName: string;
//   @IsString()
//   public lastName: string;
//   @IsEmail()
//   public email: string;
//   @IsString()
//   public phoneNumber: string;
//   @IsString()
//   public identityFileFront: string;
//   @IsString()
//   public identityFileBack: string;
//   @IsString()
//   public profilePictureFile: string;
//   @IsString()
//   public nationality: string;
//   @IsString()
//   public dateOfBirth: string;
//   @IsString()
//   public region: string;
//   @IsString()
//   public city: string;
//   @IsString()
//   public district: string;
//   @IsString()
//   public zipCode: string;
//   @IsString()
//   public primaryAddress: string;
//   @IsString()
//   public country: string;
//   @IsString()
//   public professionType: string;
//   @IsString()
//   public professionStatus: string;
//   @IsString()
//   public technicianRateType: string;
//   @IsString()
//   public technicianRate: string;
//   @IsArray()
//   public languages: string[];
//   @IsString()
//   public resumeFile: string;
//   @IsArray()
//   public specialties: string[];
//   @IsArray()
//   public referralCode: string;
//   @IsArray()
//   public certifications: string[];
//   @IsArray()
//   public availabilities: TechnicianAvailability[];
//   @IsArray()
//   @IsBase64({}, { each: true })
//   public additionalDocuments: object[];
// }
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsArray, IsBase64, IsUUID } from 'class-validator';
import TechnicianAvailability from './TechnicianAvailability.dto';

export default class CreateTechnicianInput {
  @ApiProperty({
    example: 'John',
    description: 'First name of the technician',
    required: true,
  })
  @IsString()
  public firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the technician',
    required: true,
  })
  @IsString()
  public lastName: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Email address',
    required: true,
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number',
    required: true,
  })
  @IsString()
  public phoneNumber: string;

  @ApiProperty({
    example:
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    description: 'Front side of identity file',
    required: true,
  })
  @IsBase64()
  public identityFileFront: string;

  @ApiProperty({
    example:
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    description: 'Back side of identity file',
    required: true,
  })
  @IsBase64()
  public identityFileBack: string;

  @ApiProperty({
    example:
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    description: 'Profile picture file',
    required: true,
  })
  @IsBase64()
  public profilePictureFile: string;

  @ApiProperty({
    example: 'American',
    description: 'Nationality of the technician',
    required: true,
  })
  @IsString()
  public nationality: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Date of birth (YYYY-MM-DD)',
    required: true,
  })
  @IsString()
  public dateOfBirth: string;

  @ApiProperty({
    example: 'California',
    description: 'Region of the technician',
    required: true,
  })
  @IsUUID()
  public region: string;

  @ApiProperty({
    example: 'Los Angeles',
    description: 'City of the technician',
    required: true,
  })
  @IsUUID()
  public city: string;

  @ApiProperty({
    example: 'Downtown',
    description: 'District of the technician',
    required: true,
  })
  @IsUUID()
  public district: string;

  @ApiProperty({
    example: '90001',
    description: 'ZIP code of the technician',
    required: true,
  })
  @IsString()
  public zipCode: string;

  @ApiProperty({
    example: '1234 Main St, Apt 5',
    description: 'Primary address',
    required: true,
  })
  @IsString()
  public primaryAddress: string;

  @ApiProperty({
    example: 'USA',
    description: 'Country of the technician',
    required: true,
  })
  @IsString()
  public country: string;

  @ApiProperty({
    example: 'Electrician',
    description: 'Type of profession',
    required: true,
  })
  @IsString()
  public professionType: string;

  @ApiProperty({
    example: 'Freelancer',
    description: 'Status of profession',
    required: true,
  })
  @IsString()
  public professionStatus: string;

  @ApiProperty({
    example: 'Hourly',
    description: 'Rate type (Hourly/Daily/etc.)',
    required: true,
  })
  @IsString()
  public technicianRateType: string;

  @ApiProperty({
    example: '50',
    description: 'Technician rate',
    required: true,
  })
  @IsString()
  public technicianRate: string;

  @ApiProperty({
    example: ['English', 'Spanish'],
    description: 'Languages spoken',
    required: true,
  })
  @IsArray()
  public languages: string[];

  @ApiProperty({
    example:
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    description: 'Resume file in base64 format',
    required: true,
  })
  @IsBase64()
  public resumeFile: string;

  @ApiProperty({
    example: ['HVAC', 'Electrical'],
    description: 'List of specialties',
    required: true,
  })
  @IsArray()
  public specialties: string[];

  @ApiProperty({
    example: 'REF123',
    description: 'Referral codes',
    required: true,
  })
  @IsString()
  public referralCode: string;

  @ApiProperty({
    example: ['Certified Electrician'],
    description: 'Certifications held',
    required: true,
  })
  @IsArray()
  public certifications: string[];

  @ApiProperty({
    type: [TechnicianAvailability],
    description: 'Technician availability details',
    required: true,
  })
  @IsArray()
  public availabilities: TechnicianAvailability[];

  @ApiProperty({
    example: [
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    ],
    description: 'List of additional documents in base64 format',
    required: true,
  })
  @IsArray()
  @IsBase64({}, { each: true })
  public additionalDocuments: object[];
}
