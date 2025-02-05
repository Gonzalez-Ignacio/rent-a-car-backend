import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCarDto {
  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNumber()
  passengers?: number;

  @IsOptional()
  @IsBoolean()
  ac?: boolean;

  @IsOptional()
  @IsNumber()
  pricePerDay?: number;
}
