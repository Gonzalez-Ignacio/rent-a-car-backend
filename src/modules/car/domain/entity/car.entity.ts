import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('car')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  // @OneToMany(() => Picture, (picture) => picture.car)
  // img?: Picture[];

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
