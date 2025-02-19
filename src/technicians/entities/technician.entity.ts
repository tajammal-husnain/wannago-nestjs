import { IsEmail } from 'class-validator';
import { City } from 'src/seed/entities/city.entity';
import { District } from 'src/seed/entities/districts.entity';
import { Region } from 'src/seed/entities/regions.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('technicians')
export class Technician {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  @IsEmail()
  email: string;
  @Column()
  phoneNumber: string;
  @Column()
  identityFileFront: string;
  @Column()
  identityFileBack: string;
  @Column()
  profilePictureFile: string;
  @Column()
  nationality: string;
  @Column()
  dateOfBirth: string;

  @ManyToOne(() => Region, (region) => region.technicians, {
    eager: true,
    // nullable: false,
  })
  region: Region;

  @ManyToOne(() => City, (city) => city.technicians, {
    eager: true,
    // nullable: false,
  })
  city: City;

  @ManyToOne(() => District, (district) => district.technicians, {
    eager: true,
    // nullable: false,
  })
  district: District;

  @Column()
  zipCode: string;
  @Column()
  primaryAddress: string;
  @Column()
  country: string;
  @Column()
  professionType: string;
  @Column()
  professionStatus: string;
  @Column()
  technicianRateType: string;
  @Column()
  technicianRate: string;
  @Column({ type: 'simple-array' })
  languages: string[];
  @Column()
  resumeFile: string;
  @Column({ type: 'simple-array' })
  specialties: string[];
  @Column()
  referralCode: string;
  @Column({ type: 'simple-array' })
  certifications: string[];
  @Column({ type: 'simple-array' })
  availabilities: object[];
  @Column({ type: 'simple-array' })
  additionalDocuments: object[];
}
