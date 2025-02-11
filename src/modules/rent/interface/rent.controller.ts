import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateRentDto } from '../domain/dto/create-rent.dto';
import { RentService } from '../domain/service/rent.service';
import { Rent } from '../domain/entity/rent.entity';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Get()
  async getAllRents(): Promise<Rent[]> {
    return this.rentService.getAllRents();
  }

  @Get('/:rentUuid/user/:userUuid')
  async getRent(
    @Param('userUuid', ParseUUIDPipe) userUuid: string,
    @Param('rentUuid', ParseUUIDPipe) rentUuid: string,
  ): Promise<Rent> {
    return this.rentService.getRent(userUuid, rentUuid);
  }

  @Post()
  createRent(@Body() newRent: CreateRentDto) {
    return this.rentService.createRent(newRent);
  }
}
