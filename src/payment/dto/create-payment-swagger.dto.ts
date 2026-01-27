import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentSwaggerDto {
  @ApiProperty({
    enum: ['BID', 'PRODUCT'],
    example: 'PRODUCT',
  })
  sourceType: 'BID' | 'PRODUCT';

  @ApiProperty({
    example: 5,
    description: 'ID BID atau PRODUCT tergantung sourceType',
  })
  sourceId: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
    required: false,
  })
  images?: any[];
}
