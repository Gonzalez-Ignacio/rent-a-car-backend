import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../../infraestructure/user.typeorm.repository';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers() {
    return this.userRepository.findAll();
  }

  async getUser(uuid: string): Promise<User> {
    const userFound = await this.userRepository.findByUuid(uuid);
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  async createUser(user: CreateUserDto) {
    const newUser = UserMapper.dtoToEntity(user);

    const userFound = await this.userRepository.findByEmail(newUser.email);

    if (userFound) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    return this.userRepository.save(newUser);
  }

  async update(uuid: string, user: UpdateUserDto) {
    const userFound = await this.userRepository.findByUuid(uuid);

    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = UserMapper.dtoToUpdateEntity(user, userFound);

    return this.userRepository.save(updateUser);
  }

  async delete(uuid: string) {
    const resultDelete = await this.userRepository.findByUuid(uuid);

    if (!resultDelete) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete(uuid);
  }
}
