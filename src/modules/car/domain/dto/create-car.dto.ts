import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Picture } from '../../../picture/domain/entity/picture.entity';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  img?: Picture[];

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsNumber()
  passengers: number;

  @IsNotEmpty()
  @IsBoolean()
  ac: boolean;

  @IsNotEmpty()
  @IsNumber()
  pricePerDay: number;
}
