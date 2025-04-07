import { Category } from 'src/service-categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('services')
export class OfferedService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  serviceName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Category, (category) => category?.service)
  categoryId: Category;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column()
  @CreateDateColumn({ type: 'timestamp', default: new Date() })
  createdAt: Date;

  @Column()
  @UpdateDateColumn({
    type: 'timestamp',
    default: new Date(),
  })
  updatedAt: Date;
}
