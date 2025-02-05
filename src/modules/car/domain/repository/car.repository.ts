import { Car } from '../entity/car.entity';

export interface ICarRepository {
  findAll(): Promise<Car[]>;
  findByUuid(uuid: string): Promise<Car | null>;
  save(car: Car): Promise<Car>;
  findByBrandAndModel(brand: string, model: string): Promise<Car | null>;
  update(car: Car): Promise<void>;
  delete(uuid: string): Promise<void>;
}
