import { Expose } from 'class-transformer';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';

@Entity({ name: 'address' })
export default class Address {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  @Expose()
  public street: string;

  @Column()
  @Expose()
  public city: string;

  @Column()
  @Expose()
  public country: string;

  @OneToOne(() => User, (user: User) => user.address)
  public user: User;
}
