import { Car } from '../../../car/domain/entity/car.entity';
import { CreateRentDto } from '../dto/create-rent.dto';
import { Rent } from '../entity/rent.entity';
import { User } from '../../../user/domain/entity/user.entity';
import { RentResponseDto } from '../dto/rent.response.dto';
import { UserMapper } from '../../../user/domain/mapper/user.mapper';
import { CarMapper } from '../../../car/domain/mapper/car.mapper';

export class RentMapper {
  static dtoToEntity(rent: CreateRentDto, car: Car, user: User): Rent {
    const newRent = new Rent();

    newRent.car = car;
    newRent.pricePerDay = car.pricePerDay;
    newRent.user = user;
    newRent.admin = user;
    newRent.acceptedDate = rent.acceptedDate;
    newRent.rejected = rent.rejected;
    newRent.startingDate = rent.startingDate;
    newRent.dueDate = rent.dueDate;
    newRent.endDate = rent.endDate;

    return newRent;
  }

  static entityToDto(rent: Rent) {
    const rentResponse = new RentResponseDto();

    rentResponse.uuid = rent.uuid;

    rentResponse.car = CarMapper.entityToDto(rent.car);

    rentResponse.pricePerDay = rent.pricePerDay;

    rentResponse.userUuid = UserMapper.entityToDto(rent.user);

    rentResponse.admin = UserMapper.entityToDto(rent.admin);

    rentResponse.acceptedDate = rent.acceptedDate;

    rentResponse.rejected = rent.rejected;

    rentResponse.startingDate = rent.startingDate;

    rentResponse.dueDate = rent.dueDate;

    rentResponse.endDate = rent.endDate;

    return rentResponse;
  }
}
