import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../domain/entity/car.entity';
import { ICarRepository } from '../domain/repository/car.repository';
import { Repository } from 'typeorm';

@Injectable()
export class CarRepository implements ICarRepository {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
  ) {}

  async save(car: Car): Promise<Car> {
    return await this.carRepository.save(car);
  }

  async findByBrandAndModel(brand: string, model: string): Promise<Car | null> {
    return await this.carRepository.findOne({ where: { brand, model } });
  }
}
