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

import { FlashsaleService } from './flashsale.service';
import { CreateFlashsaleSwaggerDto } from './dto/create-flashsale-swagger.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { imageFileFilter, resizeAndSaveImage } from '../common/upload';
import { CreateFlashsaleDto } from './dto/create-flashsale.dto';
import { UpdateFlashsaleDto } from './dto/update-flashsale.dto';
import { UpdateFlashsaleSwaggerDto } from './dto/update-flashsale-swagger.dto';

@ApiTags('FlashSale')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('flashsale')
export class FlashsaleController {
  constructor(private readonly flashsaleService: FlashsaleService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateFlashsaleSwaggerDto })
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: multer.memoryStorage(),
      fileFilter: imageFileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async create(
    @UploadedFiles() files: Express.Multer.File[] | undefined,
    @Body() dto: CreateFlashsaleDto,
  ) {
    const imagePaths: string[] = [];

    for (const file of files ?? []) {
      const path = await resizeAndSaveImage(file, {
        format: 'webp',
        quality: 80,
      });
      imagePaths.push(path);
    }

    return this.flashsaleService.create({
      ...dto,
      images: imagePaths,
      startAt: new Date(dto.startAt),
      endAt: new Date(dto.endAt),
    });
  }

  /**
   * GET ACTIVE FLASH SALE ONLY
   */
  @Get()
  findAllActive() {
    return this.flashsaleService.findAllActive();
  }

  // ===============================
  // UPDATE FLASH SALE (UPLOAD IMAGE)
  // ===============================
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateFlashsaleSwaggerDto })
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
    @Body() dto: UpdateFlashsaleDto,
  ) {
    const imagePaths: string[] = [];

    for (const file of files ?? []) {
      const path = await resizeAndSaveImage(file, {
        format: 'webp',
        quality: 80,
      });
      imagePaths.push(path);
    }

    return this.flashsaleService.update(Number(id), {
      ...dto,
      images: imagePaths.length ? imagePaths : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flashsaleService.findOne(Number(id));
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flashsaleService.remove(Number(id));
  }
}
