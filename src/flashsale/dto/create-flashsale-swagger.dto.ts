import { ApiProperty } from '@nestjs/swagger';

export class CreateFlashsaleSwaggerDto {
  @ApiProperty({ example: 'Flash Sale RAM DDR5' })
  name: string;

  @ApiProperty({ example: 800000 })
  price: number;

  @ApiProperty({ example: 10 })
  stock: number;

  @ApiProperty({ example: 'Diskon besar terbatas waktu' })
  desc: string;

  @ApiProperty({
    example: '2026-01-22T10:00:00Z',
    description: 'Waktu mulai flash sale (ISO string)',
  })
  startAt: string;

  @ApiProperty({
    example: '2026-01-25T10:00:00Z',
    description: 'Waktu berakhir flash sale (ISO string)',
  })
  endAt: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  images: any[];
}
