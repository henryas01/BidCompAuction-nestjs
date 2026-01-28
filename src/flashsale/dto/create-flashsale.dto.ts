import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDateString,
  Min,
} from 'class-validator';

export class CreateFlashsaleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  descriptions: string;

  @IsDateString()
  startAt: string;

  @IsDateString()
  endAt: string;
}
