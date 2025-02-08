import { IsBoolean, IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRentDto {
  @IsNotEmpty()
  @IsUUID()
  carUuid: string;

  @IsNotEmpty()
  @IsUUID()
  userUuid: string;

  @IsNotEmpty()
  @IsDateString()
  acceptedDate: Date | null;

  @IsNotEmpty()
  @IsBoolean()
  rejected: boolean;

  @IsNotEmpty()
  @IsDateString()
  startingDate: Date;

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date | null;
}
