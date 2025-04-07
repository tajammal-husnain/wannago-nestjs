import { OfferedService } from 'src/offered-services/entities/service.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  categoryName: string;

  @Column({ type: 'text', nullable: true })
  categoryDescription: string;

  @Column({ type: 'boolean', default: false })
  ixTexual: boolean;

  @OneToMany(
    () => OfferedService,
    (offeredService) => offeredService?.categoryId,
    { cascade: true },
  )
  service: OfferedService[];

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
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
