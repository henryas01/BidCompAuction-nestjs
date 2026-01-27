import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  // @ApiProperty({ type: [String] })
  // @IsArray()
  // images: string[];

  @ApiProperty()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsString()
  desc: string;
}
