import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../domain/service/user.service';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { User } from '../domain/entity/user.entity';
import { UpdateUserDto } from '../domain/dto/update-user.dto';
// import { Document } from 'src/modules/document/domain/entity/document.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  // @Get(':id/documents')
  // getUserWithDocuments(@Param('id', ParseIntPipe) id: number): Promise<User> {
  //   return this.userService.getUserWithDocuments(id);
  // }

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.userService.createUser(newUser);
  }

  // @Post(':id/documents')
  // addDocumentToUser(
  //   @Param('id', ParseIntPipe) userId: number,
  //   @Body() documentData: Partial<Document>,
  // ): Promise<Document> {
  //   return this.userService.addDocumentToUser(userId, documentData);
  // }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUser);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
