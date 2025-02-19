// district.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { City } from './city.entity';
import { Technician } from 'src/technicians/entities/technician.entity';

@Entity()
export class District {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => City, (city) => city.districts)
  city: City;

  @OneToMany(() => Technician, (technician) => technician.region)
  technicians: Technician[];
}
