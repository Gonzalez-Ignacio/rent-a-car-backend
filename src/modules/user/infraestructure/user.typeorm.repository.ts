import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from '../domain/repository/user.repository';
import { User } from '../domain/entity/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findByUuid(uuid: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { uuid } });
  }

  async findDocumentsByUser(userUuid: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { uuid: userUuid },
      relations: ['documents'],
    });
  }

  async update(user: User): Promise<void> {
    await this.userRepository.update(user.uuid, user);
  }

  async delete(uuid: string): Promise<void> {
    await this.userRepository.delete(uuid);
  }
}
