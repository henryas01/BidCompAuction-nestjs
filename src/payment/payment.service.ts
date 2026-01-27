import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payment } from './payment.entity';
import { Invoice } from './invoice.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Bid } from 'src/bids/bid.entity';
import { Product } from 'src/product/product.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,

    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,

    @InjectRepository(Bid)
    private readonly bidRepo: Repository<Bid>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  // ===============================
  // CREATE PAYMENT
  // ===============================
  async create(dto: CreatePaymentDto, userId: number, images: string[]) {
    let amount = 0;

    // 🔹 PAYMENT DARI BID
    if (dto.sourceType === 'BID') {
      const bid = await this.bidRepo.findOne({
        where: { id: dto.sourceId },
      });

      if (!bid) throw new BadRequestException('Bid not found');
      if (bid.userId !== userId)
        throw new BadRequestException('This is not your bid');
      if (bid.status !== 'WINNER')
        throw new BadRequestException('Bid is not winner');

      amount = bid.bidPrice;
    }

    // 🔹 PAYMENT DARI PRODUCT (NON FLASHSALE)
    if (dto.sourceType === 'PRODUCT') {
      const product = await this.productRepo.findOne({
        where: { id: dto.sourceId },
      });

      if (!product) throw new BadRequestException('Product not found');

      amount = product.price;
    }

    const payment = this.paymentRepo.create({
      userId,
      sourceType: dto.sourceType,
      sourceId: dto.sourceId,
      amount,
      proofImages: images,
      status: 'PENDING',
    });

    return this.paymentRepo.save(payment);
  }

  // ===============================
  // GET ALL PAYMENTS
  // ===============================
  findAll() {
    return this.paymentRepo.find({
      relations: ['invoice'],
    });
  }

  // ===============================
  // GET PAYMENT BY ID
  // ===============================
  async findOne(id: number) {
    const payment = await this.paymentRepo.findOne({
      where: { id },
      relations: ['invoice'],
    });

    if (!payment) throw new NotFoundException('Payment not found');

    return payment;
  }

  // ===============================
  // VALIDATE PAYMENT & CREATE INVOICE
  // ===============================
  async validatePayment(id: number) {
    const payment = await this.paymentRepo.findOne({
      where: { id },
      relations: ['invoice'],
    });

    if (!payment) throw new NotFoundException('Payment not found');

    if (payment.status === 'PAID')
      throw new BadRequestException('Payment already validated');

    payment.status = 'PAID';
    await this.paymentRepo.save(payment);

    const invoice = this.invoiceRepo.create({
      paymentId: payment.id,
      amount: payment.amount,
      invoiceNumber: `INV-${Date.now()}`,
    });

    return this.invoiceRepo.save(invoice);
  }

  // ===============================
  // DELETE PAYMENT
  // ===============================
  async remove(id: number) {
    const payment = await this.findOne(id);
    return this.paymentRepo.remove(payment);
  }

  // ===============================
  // GET MY INVOICES (BY TOKEN)
  // ===============================
  findMyInvoices(userId: number) {
    return this.invoiceRepo.find({
      relations: ['payment'],
      where: {
        payment: {
          userId,
        },
      },
    });
  }

  // ===============================
  // GET INVOICE BY PAYMENT ID
  // ===============================
  findInvoiceByPayment(paymentId: number) {
    return this.invoiceRepo.findOne({
      where: { paymentId },
      relations: ['payment'],
    });
  }
}
