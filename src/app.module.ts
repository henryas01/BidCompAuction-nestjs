import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { FlashsaleModule } from './flashsale/flashsale.module';
import { BidsModule } from './bids/bids.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST as string,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER as string,
      password: process.env.DB_PASS as string,
      database: process.env.DB_NAME as string,
      // entities: [User],
      autoLoadEntities: true,
      synchronize: true, // ⚠️ only in development
    }),
    AuthModule,
    ProductModule,
    FlashsaleModule,
    BidsModule,
    PaymentModule,
  ],
})
export class AppModule {}
