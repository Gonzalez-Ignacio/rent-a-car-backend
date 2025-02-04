import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CarService } from '../../../car/domain/service/car.service';
import { PictureRepository } from '../../infraestructure/picture.typeorm.repository';
import { CreatePictureDto } from '../dto/create-picture.dto';
import { PictureMapper } from '../mapper/picture.mapper';

@Injectable()
export class PictureService {
  constructor(
    private readonly carService: CarService,
    private readonly pictureRepository: PictureRepository,
  ) {}

  async createPicture(carId: number, picture: CreatePictureDto) {
    const newPicture = PictureMapper.dtoToEntity(picture);
    newPicture.car = await this.carService.getCarById(carId);

    const pictureFoundBySrc = await this.pictureRepository.findBySrc(
      picture.src,
    );

    if (pictureFoundBySrc) {
      throw new HttpException(
        'Picture already exists with this Src',
        HttpStatus.CONFLICT,
      );
    }

    return this.pictureRepository.save(newPicture);
  }
}
