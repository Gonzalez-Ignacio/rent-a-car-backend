import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRentDto } from '../dto/create-rent.dto';
import { Rent } from '../entity/rent.entity';
import { RentRepository } from '../../infraestructure/rent.typeorm.repository';
import { UserService } from '../../../user/domain/service/user.service';
import { CarService } from '../../../car/domain/service/car.service';
import { RentMapper } from '../mapper/rent.mapper';
import { Role } from '../../../user/domain/entity/user.entity';

@Injectable()
export class RentService {
  constructor(
    private readonly rentRepository: RentRepository,
    private readonly carService: CarService,
    private readonly userService: UserService,
  ) {}

  async createRent(rent: CreateRentDto): Promise<Rent> {
    const car = await this.carService.getCarById(rent.carUuid);
    const user = await this.userService.getUser(rent.userUuid);

    if (user.role !== Role.ADMIN) {
      throw new HttpException('User is not admin', HttpStatus.FORBIDDEN);
    }

    const rentFound = await this.rentRepository.findByUuid(rent.carUuid);
    if (rentFound) {
      throw new HttpException('Rent already exists', HttpStatus.CONFLICT);
    }

    const newRent = RentMapper.dtoToEntity(rent, car, user);

    return this.rentRepository.save(newRent);
  }
}
