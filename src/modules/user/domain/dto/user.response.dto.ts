import { DocumentResponseDto } from '../../../document/domain/dto/document.response.dto';
import { Role } from '../entity/user.entity';

export class UserResponseDto {
  uuid: string;
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
  address: string;
  country: string;
  role: Role;
  documents?: DocumentResponseDto[];
}
