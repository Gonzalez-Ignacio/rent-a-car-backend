import { DocumentMapper } from '../../../document/domain/mapper/document.mapper';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user.response.dto';
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

  static entityToDto(user: User) {
    const userResponse = new UserResponseDto();

    userResponse.uuid = user.uuid;

    userResponse.firstName = user.firstName;

    userResponse.lastName = user.lastName;

    userResponse.email = user.email;

    userResponse.address = user.address;

    userResponse.country = user.country;

    userResponse.dob = user.dob;

    userResponse.role = user.role;

    userResponse.documents =
      user.documents &&
      user.documents.map((doc) => DocumentMapper.entityToDto(doc));

    return userResponse;
  }
}
