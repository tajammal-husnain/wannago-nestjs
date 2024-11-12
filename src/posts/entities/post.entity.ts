import { Exclude, Expose, Transform } from 'class-transformer';
import { Column, Entity, IsNull, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'post' })
class PostEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Expose()
  public title: string;

  @Column({ nullable: true })
  @Expose()
  @Transform((value) => {
    if (value !== null) {
      return value;
    }
  })
  public content: string;
}
export default PostEntity;
