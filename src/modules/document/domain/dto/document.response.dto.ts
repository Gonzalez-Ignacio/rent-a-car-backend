import { UserResponseDto } from '../../../user/domain/dto/user.response.dto';

export class DocumentResponseDto {
  uuid: string;
  url: string;
  src: string;
  title: string;
  description: string;
  user: UserResponseDto;
}
