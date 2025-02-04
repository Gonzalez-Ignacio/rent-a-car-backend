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

  async save(picture: Picture): Promise<Picture> {
    return await this.pictureRepository.save(picture);
  }

  async findById(id: number): Promise<Picture | null> {
    return await this.pictureRepository.findOne({ where: { id } });
  }

  async findBySrc(src: string): Promise<Picture | null> {
    return await this.pictureRepository.findOne({ where: { src } });
  }
}
