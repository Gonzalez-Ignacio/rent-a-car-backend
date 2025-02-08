import { CarResponseDto } from '../../../car/domain/dto/car.response.dto';
import { UserResponseDto } from '../../../user/domain/dto/user.response.dto';

export class RentResponseDto {
  uuid: string;
  car: CarResponseDto;
  pricePerDay: number;
  userUuid: UserResponseDto;
  admin: UserResponseDto;
  acceptedDate: Date | null;
  rejected: boolean;
  startingDate: Date;
  dueDate: Date;
  endDate: Date | null;
}
