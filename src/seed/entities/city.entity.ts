// city.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { District } from './districts.entity';
import { Region } from './regions.entity';
import { Technician } from 'src/technicians/entities/technician.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Region, (region) => region.cities)
  region: Region;

  @OneToMany(() => District, (district) => district.city, { cascade: true })
  districts: District[];

  @OneToMany(() => Technician, (technician) => technician.region)
  technicians: Technician[];
}
