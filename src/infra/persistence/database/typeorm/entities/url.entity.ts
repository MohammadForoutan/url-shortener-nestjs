import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: 'urls' })
export class UrlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  originalUrl: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  shortUrl: string;

  @Column({ type: 'boolean', default: false })
  isCustom: boolean;

  @Column({ type: 'integer', default: 0 })
  clickCount: number;

  @Column({ type: 'timestamp', nullable: true })
  expirationDate: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, user => user.id)
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;
}
