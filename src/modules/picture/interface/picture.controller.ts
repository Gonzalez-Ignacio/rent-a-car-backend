import { Body, Controller, Post } from '@nestjs/common';
import { PictureService } from '../domain/service/picture.service';
import { CreatePictureDto } from '../domain/dto/create-picture.dto';

@Controller('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Post()
  async createPicture(@Body() newPicture: CreatePictureDto) {
    console.log(newPicture);
    return await this.pictureService.createPicture(
      newPicture.carId,
      newPicture,
    );
  }
}
