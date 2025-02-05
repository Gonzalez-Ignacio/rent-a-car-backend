import { User } from '../../../user/domain/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('document')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  url: string;

  @Column({ unique: true })
  src: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.documents)
  @JoinColumn({ name: 'userUuid' })
  user: User;
}
