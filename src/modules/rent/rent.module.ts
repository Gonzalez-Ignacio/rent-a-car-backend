import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from './domain/entity/rent.entity';
import { UserModule } from '../user/user.module';
import { CarModule } from '../car/car.module';
import { RentService } from './domain/service/rent.service';
import { RentRepository } from './infraestructure/rent.typeorm.repository';
import { RentController } from './interface/rent.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rent]), CarModule, UserModule],
  providers: [RentService, RentRepository],
  controllers: [RentController],
})
export class RentModule {}
