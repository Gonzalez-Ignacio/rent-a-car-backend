import { Role } from '../entity/user.entity';

export class UpdateUserDto {
  firstName?: string;

  lastName?: string;

  dob?: Date;

  email?: string;

  address?: string;

  country?: string;

  role?: Role;

  document?: Document[];
}
