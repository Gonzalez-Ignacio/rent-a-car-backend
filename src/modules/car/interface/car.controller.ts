import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CarService } from '../domain/service/car.service';
import { CreateCarDto } from '../domain/dto/create-car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  getCars() {
    return this.carService.getCars();
  }

  @Get(':id')
  getCarById(@Param('id') id: number) {
    return this.carService.getCarById(id);
  }

  @Post()
  createCar(@Body() newCar: CreateCarDto) {
    return this.carService.createCar(newCar);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() car: CreateCarDto) {
    return this.carService.update(id, car);
  }
}
