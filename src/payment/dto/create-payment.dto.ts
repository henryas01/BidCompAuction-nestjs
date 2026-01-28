import { IsEnum, IsInt } from 'class-validator';

export class CreatePaymentDto {
  @IsEnum(['BID', 'PRODUCT'])
  sourceType: 'BID' | 'PRODUCT';

  @IsInt()
  sourceId: number;
}
