import { Car } from '../../../car/domain/entity/car.entity';
import {
  Column,
  ColumnOptions,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CarPicture {
  FRONT = 'front',
  BACK = 'back',
  SIDE = 'side',
  OTHER = 'other',
}

function getPictureOptions(): ColumnOptions {
  if (process.env.NODE_ENV === 'test') {
    return { type: String, default: CarPicture.OTHER };
  }
  return { type: 'simple-enum', enum: CarPicture, default: CarPicture.OTHER };
}

@Entity('picture')
export class Picture {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => Car, (car) => car.img)
  @JoinColumn({ name: 'carUuid' })
  car: Car;

  @Column({ unique: true })
  src: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column(getPictureOptions())
  type: CarPicture;

  @Column()
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
