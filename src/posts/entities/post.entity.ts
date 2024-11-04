import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'post' })
class PostEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  title: string;

  @Column()
  content: string;
}
export default PostEntity;
