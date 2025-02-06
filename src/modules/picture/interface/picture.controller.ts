import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { PictureService } from '../domain/service/picture.service';
import { CreatePictureDto } from '../domain/dto/create-picture.dto';
import { PictureResponseDto } from '../domain/dto/picture.response.dto';

@Controller('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Get('/car/:carUuid')
  getPictures(
    @Param('carUuid', ParseUUIDPipe) carUuid: string,
  ): Promise<PictureResponseDto[]> {
    return this.pictureService.getPictures(carUuid);
  }

  @Get(':pictureUuid/car/:carUuid')
  getPicture(
    @Param('pictureUuid', ParseUUIDPipe) pictureUuid: string,
    @Param('carUuid', ParseUUIDPipe) carUuid: string,
  ): Promise<PictureResponseDto> {
    return this.pictureService.getPicture(carUuid, pictureUuid);
  }

  @Post()
  async createPicture(@Body() newPicture: CreatePictureDto) {
    return await this.pictureService.createPicture(
      newPicture.carUuid,
      newPicture,
    );
  }
}
