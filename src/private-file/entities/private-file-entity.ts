import { Expose } from 'class-transformer';
import User from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class PrivateFile {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  @Expose()
  public key: string;

  @ManyToOne(() => User, (user: User) => user.privateFiles)
  public owner: User;
}
