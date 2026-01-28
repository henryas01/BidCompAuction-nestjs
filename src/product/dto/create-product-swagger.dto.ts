import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductSwaggerDto {
  @ApiPropertyOptional({ example: 'New Product Name' })
  name?: string;

  @ApiPropertyOptional({ example: 150000 })
  price?: number;

  @ApiPropertyOptional({ example: 'Updated description' })
  desc?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  images?: any[];
}
