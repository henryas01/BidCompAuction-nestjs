import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserSwaggerDto {
  @ApiPropertyOptional({
    example: 'John Doe',
  })
  name?: string;

  @ApiPropertyOptional({
    example: '+1234567890',
  })
  phone_number?: string;

  @ApiPropertyOptional({
    example: 'john.doe@example.com',
  })
  email?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'User profile image',
  })
  image?: any;

  @ApiPropertyOptional({
    example: 'Jl. Sudirman No. 123',
  })
  address?: string;
}
