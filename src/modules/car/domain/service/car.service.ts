import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CarRepository } from '../../infraestructure/car.typeorm.repository';
import { CreateCarDto } from '../dto/create-car.dto';
import { CarMapper } from '../mapper/car.mapper';
import { Car } from '../entity/car.entity';
import { UpdateCarDto } from '../dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(private readonly carRepository: CarRepository) {}

  async getCars() {
    return await this.carRepository.findAll();
  }

  async getCarById(uuid: string): Promise<Car> {
    const carFound = await this.carRepository.findByUuid(uuid);

    if (!carFound) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    return carFound;
  }

  async createCar(car: CreateCarDto) {
    const newCar = CarMapper.dtoToEntity(car);

    const carFound = await this.carRepository.findByBrandAndModel(
      newCar.brand,
      newCar.model,
    );

    if (carFound) {
      throw new HttpException('Car already exists', HttpStatus.CONFLICT);
    }

    return this.carRepository.save(newCar);
  }

  async update(uuid: string, car: UpdateCarDto) {
    const carFound = await this.carRepository.findByUuid(uuid);

    if (!carFound) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    const updateCar = CarMapper.dtoToUpdateEntity(car, carFound);

    return this.carRepository.save(updateCar);
  }

  async delete(uuid: string) {
    const carFound = await this.carRepository.findByUuid(uuid);

    if (!carFound) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    return this.carRepository.delete(uuid);
  }
}
