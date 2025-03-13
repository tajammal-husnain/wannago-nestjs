import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('packages')
export default class PackageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  segmentId?: string;

  @Column()
  packageName?: string;

  @Column()
  description?: string;

  @Column()
  packageDetails?: string;

  @Column()
  price: number;

  @Column('simple-array')
  packageServices?: any[];

  @Column('simple-array')
  packageDurations?: any[];

  @Column()
  @IsNumber()
  sortOrder?: number;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: true })
  isActive: boolean;
}
