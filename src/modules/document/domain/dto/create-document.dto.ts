import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty()
  @IsUUID()
  userUuid: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  src: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
