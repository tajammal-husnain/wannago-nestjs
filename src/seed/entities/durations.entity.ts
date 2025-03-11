import { IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Duration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  durationType: string;

  @Column()
  @IsString()
  durationCode: string;

  @OneToMany(() => User, (user) => user.region)
  user: User[];
}
