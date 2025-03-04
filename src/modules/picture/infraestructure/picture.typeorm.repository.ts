import { Injectable } from '@nestjs/common';
import { IPictureRepository } from '../domain/repository/picture.repository';
import { Repository } from 'typeorm';
import { Picture } from '../domain/entity/picture.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PictureRepository implements IPictureRepository {
  constructor(
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
  ) {}

  async findAllPicturesByCar(carUuid: string): Promise<Picture[]> {
    return await this.pictureRepository.find({
      where: { car: { uuid: carUuid } },
    });
  }

  async save(picture: Picture): Promise<Picture> {
    return await this.pictureRepository.save(picture);
  }

  async findById(uuid: string): Promise<Picture | null> {
    return await this.pictureRepository.findOne({ where: { uuid } });
  }

  async findBySrc(src: string): Promise<Picture | null> {
    return await this.pictureRepository.findOne({ where: { src } });
  }

  async findOnePicture(
    carUuid: string,
    pictureUuid: string,
  ): Promise<Picture | null> {
    return await this.pictureRepository.findOne({
      where: { car: { uuid: carUuid }, uuid: pictureUuid },
    });
  }

  async delete(pictureUuid: string): Promise<void> {
    await this.pictureRepository.delete(pictureUuid);
  }
}
