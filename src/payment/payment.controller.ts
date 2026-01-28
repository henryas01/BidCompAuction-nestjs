import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { imageFileFilter, resizeAndSaveImage } from '../common/upload';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreatePaymentSwaggerDto } from './dto/create-payment-swagger.dto';
import type { JwtRequest } from 'src/auth/interfaces/jwt-request.interface';

@ApiTags('Payment')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // ===============================
  // CREATE PAYMENT
  // ===============================
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePaymentSwaggerDto })
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: multer.memoryStorage(),
      fileFilter: imageFileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: CreatePaymentDto,
    @Req() req: JwtRequest,
  ) {
    const imagePaths: string[] = [];

    for (const file of files || []) {
      const path = await resizeAndSaveImage(file, {
        format: 'webp',
        quality: 80,
      });
      imagePaths.push(path);
    }

    return this.paymentService.create(dto, req.user.sub, imagePaths);
  }

  // ===============================
  // GET ALL PAYMENTS
  // ===============================
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  // ===============================
  // GET MY INVOICES (BY TOKEN)
  // ===============================
  @Get('invoice/me')
  getMyInvoices(@Req() req: JwtRequest) {
    return this.paymentService.findMyInvoices(req.user.sub);
  }

  // ===============================
  // GET PAYMENT BY ID
  // ===============================
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.paymentService.findOne(id);
  }

  // ===============================
  // VALIDATE PAYMENT
  // ===============================
  @Post(':id/validate')
  validate(@Param('id') id: number) {
    return this.paymentService.validatePayment(id);
  }

  // ===============================
  // DELETE PAYMENT
  // ===============================
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.paymentService.remove(id);
  }

  // ===============================
  // GET MY INVOICES
  // ===============================
  // @Get('invoice')
  // getMyInvoices(@Req() req: JwtRequest) {
  //   return this.paymentService.findMyInvoices(req.user.sub);
  // }

  // ===============================
  // GET INVOICE BY PAYMENT
  // ===============================
  @Get(':id/invoice')
  getInvoice(@Param('id') id: number) {
    return this.paymentService.findInvoiceByPayment(id);
  }
}
