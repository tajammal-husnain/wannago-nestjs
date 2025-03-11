// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { IsEmail, IsOptional } from 'class-validator';
// import { Region } from 'src/seed/entities/regions.entity';
// import { District } from 'src/seed/entities/districts.entity';
// import { City } from 'src/seed/entities/city.entity';
// import { Segment } from 'src/seed/entities/segment.entity';

// export enum UserType {
//   TECHNICIAN = 'technician',
//   CUSTOMER = 'customer',
//   ADMIN = 'admin',
//   null = null,
// }

// @Entity('users')
// export class User {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ type: 'enum', enum: UserType, nullable: true })
//   userType: UserType;

//   @Column()
//   firstName: string;

//   @Column()
//   lastName: string;

//   @Column({ unique: true })
//   @IsEmail()
//   email: string;

//   @Column()
//   @IsOptional()
//   phoneNumber: string;

//   @Column()
//   @IsOptional()
//   dateOfBirth?: string;

//   @Column()
//   @IsOptional()
//   password: string;

//   @Column({ nullable: true })
//   @IsOptional()
//   profilePictureFile?: string;

//   @Column()
//   @IsOptional()
//   nationality: string;

//   @Column()
//   @IsOptional()
//   @ManyToOne(() => Region, (region) => region.user, {
//     eager: true,
//     nullable: true,
//   })
//   region?: Region;

//   @Column()
//   @IsOptional()
//   @ManyToOne(() => City, (city) => city.user, {
//     eager: true,
//     nullable: true,
//   })
//   city?: City;

//   @Column()
//   @IsOptional()
//   @ManyToOne(() => District, (district) => district.user, {
//     eager: true,
//     nullable: true,
//   })
//   district?: District;

//   @Column({ nullable: true })
//   @IsOptional()
//   zipCode?: string;

//   @Column({ nullable: true })
//   @IsOptional()
//   primaryAddress?: string;

//   @Column()
//   @IsOptional()
//   country: string;

//   // Customer-specific fields (nullable for other user types)
//   @Column({ nullable: true })
//   @IsOptional()
//   referredBy?: string;

//   @Column({ nullable: true })
//   @IsOptional()
//   couponCode?: string;

//   @Column({ nullable: true })
//   @IsOptional()
//   packageId?: string;

//   @ManyToOne(() => Segment, (segment) => segment.user, {
//     eager: true,
//     nullable: true,
//   })
//   segmentId?: Segment;

//   @Column({ nullable: true })
//   @IsOptional()
//   durationId?: string;

//   @Column({ nullable: true })
//   @IsOptional()
//   billToPay?: string;

//   // Technician-specific fields (nullable for other user types)
//   @Column({ nullable: true })
//   @IsOptional()
//   professionType?: string;

//   @Column({ nullable: true })
//   @IsOptional()
//   professionStatus?: string;

//   @Column({ nullable: true })
//   @IsOptional()
//   technicianRateType?: string;

//   @Column({ nullable: true })
//   @IsOptional()
//   technicianRate?: string;

//   @Column({ nullable: true })
//   @IsOptional()
//   @IsOptional()
//   identityFileFront?: string;

//   @Column({ nullable: true })
//   @IsOptional()
//   identityFileBack?: string;

//   @Column({ nullable: true })
//   @IsOptional()
//   resumeFile?: string;

//   @Column({ nullable: true })
//   @IsOptional()
//   additionalDocuments?: string;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
// }
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  TableInheritance,
  ChildEntity,
  ManyToOne,
} from 'typeorm';
import { IsEmail, IsOptional } from 'class-validator';
import { Region } from 'src/seed/entities/regions.entity';
import { District } from 'src/seed/entities/districts.entity';
import { City } from 'src/seed/entities/city.entity';
import { Segment } from 'src/seed/entities/segment.entity';
import { UserRoleType } from '../constants/user-role-type';
import { IRateType } from '../constants/rate-type';

@Entity('users')
@TableInheritance({
  column: {
    type: 'enum',
    name: 'role',
    enum: ['SUPER_ADMIN', 'ADMIN', 'CUSTOMER', 'TECHNICIAN'],
  },
})
class User {
  @Column()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ default: 'hello@123' })
  password: string;

  @Column({ nullable: true })
  @IsOptional()
  nationality?: string;

  @Column({ nullable: true })
  @IsOptional()
  phone?: string;

  @Column({ nullable: true })
  @IsOptional()
  address?: string;

  @Column({ nullable: true })
  @ManyToOne(() => Region, (region) => region.user, {
    eager: true,
    nullable: true,
  })
  @IsOptional()
  region?: string;

  @Column({ nullable: true })
  @ManyToOne(() => City, (city) => city.user, {
    eager: true,
    nullable: true,
  })
  @IsOptional()
  city?: string;

  @Column({ nullable: true })
  @ManyToOne(() => District, (district) => district.user, {
    eager: true,
    nullable: true,
  })
  @IsOptional()
  district?: string;

  @Column({ nullable: true })
  @IsOptional()
  zipCode?: string;

  @Column({ nullable: true })
  @IsOptional()
  country?: string;

  @Column({
    type: 'enum',
    enum: UserRoleType,
  })
  role: UserRoleType;
}

@ChildEntity(UserRoleType.SUPER_ADMIN)
class SuperAdmin extends User {
  @Column({ nullable: true })
  area?: string;
}

@ChildEntity(UserRoleType.ADMIN)
class Admin extends User {
  @Column({ nullable: true })
  roldeId?: string;
}

@ChildEntity(UserRoleType.CUSTOMER)
class Customer extends User {
  @Column({ nullable: true })
  referredBy?: string;

  @Column({ nullable: true })
  couponCode?: string;

  @Column({ nullable: true })
  packageId?: string;

  @Column({ nullable: true })
  durationId?: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ nullable: true })
  @ManyToOne(() => Segment, (segment) => segment.user, {
    eager: true,
    nullable: true,
  })
  segmentId?: string;

  @Column({ nullable: true })
  billToPay?: string;
}

@ChildEntity(UserRoleType.TECHNICIAN)
class Technician extends User {
  @Column({ nullable: true })
  professionType?: string;

  @Column({ nullable: true })
  professionStatus?: string;

  @Column({
    type: 'enum',
    enum: IRateType,
    nullable: true,
  })
  rateType?: IRateType;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ type: 'decimal', nullable: true })
  rate?: string;

  @Column({ nullable: true })
  identityFileFront?: string;

  @Column({ nullable: true })
  identityFileBack?: string;

  @Column({ nullable: true })
  resumeFile?: string;

  @Column('simple-array', { nullable: true })
  languages?: string[];

  @Column('simple-array', { nullable: true })
  certificates?: string[];

  @Column({ nullable: true })
  availability?: string; // E.g., "Monday to Friday 9am-5pm"

  @Column('simple-array', { nullable: true })
  additionalDocuments?: string[];
}

export { User, SuperAdmin, Admin, Customer, Technician };
