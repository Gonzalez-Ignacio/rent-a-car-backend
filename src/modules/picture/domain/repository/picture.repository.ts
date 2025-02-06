import { Picture } from '../entity/picture.entity';

export interface IPictureRepository {
  findAllPicturesByCar(carUuid: string): Promise<Picture[]>;
  save(picture: Picture): Promise<Picture>;
  findBySrc(src: string): Promise<Picture | null>;
  findOnePicture(carUuid: string, pictureUuid: string): Promise<Picture | null>;
  delete(pictureUuid: string): Promise<void>;
}
