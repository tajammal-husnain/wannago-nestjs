import { IsString } from 'class-validator';
import { Customer } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Segment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  segmentName: string;

  @Column()
  @IsString()
  segmentCode: string;

  @Column()
  @IsString()
  segmentDescription: string;

  @OneToMany(() => Customer, (user) => user.segmentId)
  user?: Customer;
}
