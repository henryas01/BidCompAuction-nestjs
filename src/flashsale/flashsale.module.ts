import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FlashsaleController } from './flashsale.controller';
import { FlashsaleService } from './flashsale.service';
import { FlashSale } from './flashsale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FlashSale])],
  controllers: [FlashsaleController],
  providers: [FlashsaleService],
  exports: [FlashsaleService],
})
export class FlashsaleModule {}
