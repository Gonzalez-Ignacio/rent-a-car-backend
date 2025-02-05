import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CarPicture } from '../entity/picture.entity';

export class CreatePictureDto {
  @IsNotEmpty()
  @IsUUID()
  carUuid: string;

  @IsNotEmpty()
  @IsString()
  src: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(CarPicture)
  type: CarPicture;

  @IsNotEmpty()
  date: Date;
}
