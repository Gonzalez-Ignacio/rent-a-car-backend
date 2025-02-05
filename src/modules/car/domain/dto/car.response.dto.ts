import { PictureResponseDto } from '../../../picture/domain/dto/picture.response.dto';

export class CarResponseDto {
  uuid: string;
  brand: string;
  model: string;
  img?: PictureResponseDto[];
  color: string;
  passengers: number;
  ac: boolean;
  pricePerDay: number;
}
