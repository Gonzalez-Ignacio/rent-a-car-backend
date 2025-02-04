import { Picture } from '../entity/picture.entity';

export interface IPictureRepository {
  save(picture: Picture): Promise<Picture>;
  findBySrc(src: string): Promise<Picture | null>;
}
