import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarService } from '../domain/service/car.service';
import { CreateCarDto } from '../domain/dto/create-car.dto';
import { UpdateCarDto } from '../domain/dto/update-car.dto';
import { CarResponseDto } from '../domain/dto/car.response.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  getCars() {
    return this.carService.getCars();
  }

  @Get(':uuid')
  getCarById(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<CarResponseDto> {
    return this.carService.getCarById(uuid);
  }

  @Post()
  createCar(@Body() newCar: CreateCarDto) {
    return this.carService.createCar(newCar);
  }

  @Patch(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() car: UpdateCarDto,
  ): Promise<CarResponseDto> {
    return this.carService.update(uuid, car);
  }

  @Delete(':uuid')
  delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.carService.delete(uuid);
  }
}
