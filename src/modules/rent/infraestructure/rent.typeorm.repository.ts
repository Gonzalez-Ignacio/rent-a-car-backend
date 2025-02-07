import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rent } from '../domain/entity/rent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RentRepository {
  constructor(
    @InjectRepository(Rent) private readonly rentRepository: Repository<Rent>,
  ) {}

  async finAll(): Promise<Rent[]> {
    return await this.rentRepository.find();
  }

  async save(rent: Rent): Promise<Rent> {
    return await this.rentRepository.save(rent);
  }

  async findByUuid(uuid: string): Promise<Rent | null> {
    return await this.rentRepository.findOneBy({ uuid });
  }

  async update(rent: Rent): Promise<void> {
    await this.rentRepository.update(rent.uuid, rent);
  }

  async delete(uuid: string): Promise<void> {
    await this.rentRepository.delete(uuid);
  }
}
