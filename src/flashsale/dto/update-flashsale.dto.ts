import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';
// import { Type } from 'class-transformer';
export class UpdateFlashsaleDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsOptional()
  @IsString()
  descriptions?: string;

  @IsOptional()
  @IsDateString()
  startAt?: string;

  @IsOptional()
  @IsDateString()
  endAt?: string;

  @IsOptional()
  isActive?: boolean;
}
