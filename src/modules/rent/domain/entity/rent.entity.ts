import { Exclude } from 'class-transformer';
import { Car } from '../../../car/domain/entity/car.entity';
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

@Entity()
export class Rent {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'carUuid' })
  car: Car;

  @Column()
  pricePerDay: number;

  @ManyToOne(() => User, (user) => user.uuid)
  @JoinColumn({ name: 'userUuid' })
  user: User;

  @ManyToOne(() => User, (user) => user.role)
  @JoinColumn({ name: 'role' })
  admin: User;

  @Column({ type: 'date', nullable: true })
  acceptedDate: Date | null;

  @Column()
  rejected: boolean;

  @Column()
  startingDate: Date;

  @Column()
  dueDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date | null;

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn()
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn()
  updatedAt: Date;
}
