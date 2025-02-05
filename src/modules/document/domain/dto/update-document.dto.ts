import { IsOptional, IsString } from 'class-validator';

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  src?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
