import { Car } from '../entity/car.entity';

export interface ICarRepository {
  findAll(): Promise<Car[]>;
  findById(id: number): Promise<Car | null>;
  save(car: Car): Promise<Car>;
  findByBrandAndModel(brand: string, model: string): Promise<Car | null>;
}
