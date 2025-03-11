// region.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { City } from './city.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Region extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => City, (city) => city.region, { cascade: true })
  cities: City[];

  @OneToMany(() => User, (user) => user.region)
  user: User[];
}
