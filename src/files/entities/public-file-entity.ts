import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'files' })
export default class Files {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  @Expose()
  public url: string;

  @Column()
  @Expose()
  public key: string;
}
