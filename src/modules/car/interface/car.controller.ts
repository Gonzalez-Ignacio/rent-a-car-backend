import { Body, Controller, Post } from '@nestjs/common';
import { CarService } from '../domain/service/car.service';
import { CreateCarDto } from '../domain/dto/create-car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  createCar(@Body() newCar: CreateCarDto) {
    return this.carService.createCar(newCar);
  }
}
