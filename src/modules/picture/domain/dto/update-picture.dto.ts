import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { CarPicture } from '../entity/picture.entity';

export class UpdatePictureDto {
  @IsOptional()
  @IsUUID()
  carUuid: string;

  @IsOptional()
  @IsString()
  src: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(CarPicture)
  type: CarPicture;

  @IsOptional()
  date: Date;
}
