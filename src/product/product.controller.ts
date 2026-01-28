import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags, ApiBody } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import multer from 'multer';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { imageFileFilter, resizeAndSaveImage } from '../common/upload';
import { UpdateProductSwaggerDto } from './dto/create-product-swagger.dto';

@ApiTags('Product')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateProductSwaggerDto })
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: multer.memoryStorage(),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 5 * 1024 * 1024, // 2MB
      },
    }),
  )
  async create(
    @UploadedFiles() files: Express.Multer.File[] | undefined,
    @Body() dto: CreateProductDto,
  ) {
    const imagePaths: string[] = [];

    for (const file of files ?? []) {
      const path = await resizeAndSaveImage(file, {
        format: 'webp',
        quality: 80,
      });
      imagePaths.push(path);
    }

    return this.productService.create({
      ...dto,
      images: imagePaths,
    });
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // ===============================
  // UPDATE PRODUCT (UPLOAD IMAGE)
  // ===============================
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateProductSwaggerDto })
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: multer.memoryStorage(),
      fileFilter: imageFileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: UpdateProductDto,
  ) {
    const imagePaths: string[] = [];

    for (const file of files ?? []) {
      const path = await resizeAndSaveImage(file, {
        format: 'webp',
        quality: 80,
      });
      imagePaths.push(path);
    }

    return this.productService.update(Number(id), {
      ...dto,
      images: imagePaths.length ? imagePaths : undefined,
    });
  }

  // ===============================
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(Number(id));
  }
}
