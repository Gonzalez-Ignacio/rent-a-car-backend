import { Module } from '@nestjs/common';
import { CarController } from './interface/car.controller';
import { CarService } from './domain/service/car.service';
import { CarRepository } from './infraestructure/car.typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './domain/entity/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  providers: [CarService, CarRepository],
  controllers: [CarController],
  exports: [CarService],
})
export class CarModule {}
