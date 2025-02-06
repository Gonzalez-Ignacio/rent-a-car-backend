import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PictureService } from '../domain/service/picture.service';
import { CreatePictureDto } from '../domain/dto/create-picture.dto';
import { PictureResponseDto } from '../domain/dto/picture.response.dto';
import { UpdatePictureDto } from '../domain/dto/update-picture.dto';

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

  @Patch(':pictureUuid/car/:carUuid')
  updatePicture(
    @Param('carUuid', ParseUUIDPipe) carUuid: string,
    @Param('pictureUuid', ParseUUIDPipe) pictureUuid: string,
    @Body() updatePicture: UpdatePictureDto,
  ): Promise<PictureResponseDto> {
    return this.pictureService.update(carUuid, pictureUuid, updatePicture);
  }
}
