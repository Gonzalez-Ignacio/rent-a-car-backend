import { Picture } from '../../../picture/domain/entity/picture.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('car')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @OneToMany(() => Picture, (picture) => picture.car)
  img?: Picture[];

  @Column()
  color: string;

  @Column()
  passengers: number;

  @Column()
  ac: boolean;

  @Column()
  pricePerDay: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
