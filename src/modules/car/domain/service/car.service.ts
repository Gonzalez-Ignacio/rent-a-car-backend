import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CarRepository } from '../../infraestructure/car.typeorm.repository';
import { CreateCarDto } from '../dto/create-car.dto';
import { CarMapper } from '../mapper/car.mapper';

@Injectable()
export class CarService {
  constructor(private readonly carRepository: CarRepository) {}

  async createCar(car: CreateCarDto) {
    if (
      !car.brand ||
      !car.model ||
      !car.color ||
      !car.passengers ||
      !car.ac ||
      !car.pricePerDay
    ) {
      throw new HttpException('Fields cannot be empty', HttpStatus.BAD_REQUEST);
    }

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
}
