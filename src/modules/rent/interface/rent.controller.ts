import { Body, Controller, Post } from '@nestjs/common';
import { CreateRentDto } from '../domain/dto/create-rent.dto';
import { RentService } from '../domain/service/rent.service';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Post()
  createRent(@Body() newRent: CreateRentDto) {
    return this.rentService.createRent(newRent);
  }
}
