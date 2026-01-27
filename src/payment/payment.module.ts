import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Invoice } from './invoice.entity';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Bid } from 'src/bids/bid.entity';
import { Product } from 'src/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Invoice, Bid, Product])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
