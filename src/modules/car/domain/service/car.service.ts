import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CarRepository } from '../../infraestructure/car.typeorm.repository';
import { CreateCarDto } from '../dto/create-car.dto';
import { CarMapper } from '../mapper/car.mapper';
import { Car } from '../entity/car.entity';

@Injectable()
export class CarService {
  constructor(private readonly carRepository: CarRepository) {}

  async getCars() {
    return await this.carRepository.findAll();
  }

  async getCarById(id: number): Promise<Car> {
    const carFound = await this.carRepository.findById(id);

    if (!carFound) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    return carFound;
  }

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
