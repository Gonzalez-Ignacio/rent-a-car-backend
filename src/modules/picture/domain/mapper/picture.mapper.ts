import { CarMapper } from '../../../car/domain/mapper/car.mapper';
import { CreatePictureDto } from '../dto/create-picture.dto';
import { PictureResponseDto } from '../dto/picture.response.dto';
import { UpdatePictureDto } from '../dto/update-picture.dto';
import { Picture } from '../entity/picture.entity';

export class PictureMapper {
  static dtoToEntity(picture: CreatePictureDto) {
    const newPicture = new Picture();
    newPicture.src = picture.src;
    newPicture.description = picture.description;
    newPicture.title = picture.title;
    newPicture.type = picture.type;
    newPicture.date = picture.date;
    return newPicture;
  }

  static dtoToUpdateEntity(
    pictureUpdate: UpdatePictureDto,
    pictureExisting: Picture,
  ) {
    return {
      ...pictureExisting,
      ...pictureUpdate,
    };
  }

  static entityToDto(picture: Picture) {
    const pictureResponse = new PictureResponseDto();
    pictureResponse.uuid = picture.uuid;
    pictureResponse.car = CarMapper.entityToDto(picture.car);
    pictureResponse.src = picture.src;
    pictureResponse.title = picture.title;
    pictureResponse.description = picture.description;
    pictureResponse.type = picture.type;
    pictureResponse.date = picture.date;
    return pictureResponse;
  }
}
