import { Document } from '../../../document/domain/entity/document.entity';
import { Role } from '../entity/user.entity';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  dob: Date;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  documents?: Document[];
}
