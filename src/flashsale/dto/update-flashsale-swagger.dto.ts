import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFlashsaleSwaggerDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  price?: number;

  @ApiPropertyOptional()
  stock?: number;

  @ApiPropertyOptional()
  descriptions?: string;

  @ApiPropertyOptional()
  startAt?: string;

  @ApiPropertyOptional()
  endAt?: string;

  @ApiPropertyOptional()
  isActive?: boolean;

  // ✅ HANYA UNTUK SWAGGER
  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  images?: any[];
}
