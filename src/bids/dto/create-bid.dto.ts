import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateBidDto {
  @ApiProperty({ example: 3 })
  @IsNumber()
  flashSaleId: number;

  @ApiProperty({ example: 4000000 })
  @IsNumber()
  @Min(1)
  bidPrice: number;
}
