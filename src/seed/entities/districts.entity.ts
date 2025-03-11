// district.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { City } from './city.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class District {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => City, (city) => city.districts)
  city: City;

  @OneToMany(() => User, (user) => user.district)
  user: User[];
}
