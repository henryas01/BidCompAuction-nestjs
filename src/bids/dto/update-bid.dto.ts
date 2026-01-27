import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class UpdateBidDto {
  @ApiPropertyOptional({ example: 4200000 })
  @IsNumber()
  @Min(1)
  bidPrice?: number;
}
