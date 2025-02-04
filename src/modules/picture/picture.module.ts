import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './domain/entity/picture.entity';
import { CarModule } from '../car/car.module';
import { PictureService } from './domain/service/picture.service';
import { PictureRepository } from './infraestructure/picture.typeorm.repository';
import { PictureController } from './interface/picture.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Picture]), CarModule],
  providers: [PictureService, PictureRepository],
  controllers: [PictureController],
})
export class PictureModule {}
