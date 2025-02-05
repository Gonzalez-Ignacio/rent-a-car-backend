import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  // ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../domain/service/user.service';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { User } from '../domain/entity/user.entity';
import { UpdateUserDto } from '../domain/dto/update-user.dto';
import { UserResponseDto } from '../domain/dto/user.response.dto';
import { UserMapper } from '../domain/mapper/user.mapper';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':uuid')
  getUser(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<UserResponseDto> {
    return this.userService.getUser(uuid);
  }

  @Post()
  async createUser(@Body() newUser: CreateUserDto) {
    return await this.userService.createUser(newUser);
  }

  @Patch(':uuid')
  async updateUser(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.update(uuid, updateUser);
    return UserMapper.entityToDto(user);
  }

  @Delete(':uuid')
  deleteUser(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.userService.delete(uuid);
  }
}
