import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Post {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  public category?: string;
}

export default Post;
