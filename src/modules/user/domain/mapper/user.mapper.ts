import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entity/user.entity';

export class UserMapper {
  static dtoToEntity(user: CreateUserDto) {
    const newUser = new User();

    newUser.firstName = user.firstName;

    newUser.lastName = user.lastName;

    newUser.email = user.email;

    newUser.address = user.address;

    newUser.country = user.country;

    newUser.dob = user.dob;

    newUser.role = user.role;

    newUser.documents = user.documents || [];
    return newUser;
  }

  static dtoToUpdateEntity(userUpdate: UpdateUserDto, userExisting: User) {
    return {
      ...userExisting,
      ...userUpdate,
    };
  }
}
