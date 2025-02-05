import { CarResponseDto } from '../../../car/domain/dto/car.response.dto';

export class PictureResponseDto {
  uuid: string;
  car: CarResponseDto;
  src: string;
  title: string;
  description: string;
  type: string;
  date: Date;
}
