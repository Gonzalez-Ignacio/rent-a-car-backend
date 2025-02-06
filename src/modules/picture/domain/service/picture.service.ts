import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CarService } from '../../../car/domain/service/car.service';
import { PictureRepository } from '../../infraestructure/picture.typeorm.repository';
import { CreatePictureDto } from '../dto/create-picture.dto';
import { PictureMapper } from '../mapper/picture.mapper';
import { Picture } from '../entity/picture.entity';
import { UpdatePictureDto } from '../dto/update-picture.dto';

@Injectable()
export class PictureService {
  constructor(
    private readonly carService: CarService,
    private readonly pictureRepository: PictureRepository,
  ) {}

  async getPictures(carUuid: string): Promise<Picture[]> {
    const carFound = await this.carService.getCarById(carUuid);

    if (!carFound) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    return this.pictureRepository.findAllPicturesByCar(carUuid);
  }

  async getPicture(carUuid: string, pictureUuid: string): Promise<Picture> {
    const pictureFound = await this.pictureRepository.findOnePicture(
      carUuid,
      pictureUuid,
    );

    if (!pictureFound) {
      throw new HttpException('Picture not found', HttpStatus.NOT_FOUND);
    }

    return pictureFound;
  }

  async createPicture(carUuid: string, picture: CreatePictureDto) {
    const newPicture = PictureMapper.dtoToEntity(picture);
    newPicture.car = await this.carService.getCarById(carUuid);

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

  async update(
    carUuid: string,
    pictureUuid: string,
    picture: UpdatePictureDto,
  ): Promise<Picture> {
    const pictureFound = await this.pictureRepository.findOnePicture(
      carUuid,
      pictureUuid,
    );

    if (!pictureFound) {
      throw new HttpException('Picture or Car not found', HttpStatus.NOT_FOUND);
    }

    const updatePicture = PictureMapper.dtoToUpdateEntity(
      picture,
      pictureFound,
    );

    return this.pictureRepository.save(updatePicture);
  }
}
