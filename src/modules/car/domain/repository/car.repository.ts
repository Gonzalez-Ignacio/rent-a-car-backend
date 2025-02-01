import { Car } from '../entity/car.entity';

export interface ICarRepository {
  save(car: Car): Promise<Car>;
  findByBrandAndModel(brand: string, model: string): Promise<Car | null>;
}
