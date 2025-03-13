import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  categoryName: string;

  @Column({ type: 'text', nullable: true })
  categoryDescription: string;

  @Column({ type: 'boolean', default: false })
  ixTexual: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp', default: new Date() })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: new Date() })
  updatedAt: Date;
}
