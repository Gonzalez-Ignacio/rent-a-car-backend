import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../../infraestructure/user.typeorm.repository';
import { UserMapper } from '../mapper/user.mapper';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Document } from 'src/modules/document/domain/entity/document.entity';
// import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,

    // @InjectRepository(Document)
    // private readonly documentRepository: Repository<Document>,
  ) {}

  getUsers() {
    return this.userRepository.findAll();
  }

  async getUser(id: number): Promise<User> {
    const userFound = await this.userRepository.findById(id);
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  // async getUserWithDocuments(id: number): Promise<User> {
  //   const userFound = await this.userRepository.findById(id);
  //   if (!userFound) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }

  //   const findDocumentsOfUser =
  //     await this.userRepository.findDocumentsByUser(id);

  //   if (!findDocumentsOfUser) {
  //     throw new HttpException(
  //       'Documents not found for the user',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }

  //   return findDocumentsOfUser;
  // }

  async createUser(user: CreateUserDto) {
    if (!user.firstName || !user.lastName || !user.email) {
      throw new HttpException('Fields cannot be empty', HttpStatus.BAD_REQUEST);
    }

    const newUser = UserMapper.dtoToEntity(user);

    const userFound = await this.userRepository.findByEmail(newUser.email);

    if (userFound) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    return this.userRepository.save(newUser);
  }

  // async addDocumentToUser(
  //   userId: number,
  //   documentData: Partial<Document>,
  // ): Promise<Document> {
  //   const user = await this.userRepository.findById(userId);
  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }

  //   const document = this.documentRepository.create({ ...documentData, user });
  //   return this.documentRepository.save(document);
  // }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findById(id);

    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = UserMapper.dtoToUpdateEntity(user, userFound);

    return this.userRepository.save(updateUser);
  }

  async deleteUser(id: number) {
    const resultDelete = await this.userRepository.findById(id);

    if (!resultDelete) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete(id);
  }
}
