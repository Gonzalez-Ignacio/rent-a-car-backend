import { Document } from 'src/modules/document/domain/entity/document.entity';
import { Role } from '../entity/user.entity';

export class CreateUserDto {
  firstName: string;

  lastName: string;

  dob: Date;

  email: string;

  address: string;

  country: string;

  role: Role;

  documents?: Document[];
}
