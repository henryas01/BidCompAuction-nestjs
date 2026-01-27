import { ApiProperty } from '@nestjs/swagger';

export class CreateProductSwaggerDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  desc: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  images: any[];
}
