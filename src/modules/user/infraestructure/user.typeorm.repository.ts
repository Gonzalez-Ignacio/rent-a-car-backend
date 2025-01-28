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

  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findDocumentsByUser(userId: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['documents'],
    });
  }

  async update(user: User): Promise<void> {
    await this.userRepository.update(user.id, user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
