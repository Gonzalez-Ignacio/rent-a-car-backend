import { CreatePictureDto } from '../dto/create-picture.dto';
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
}
