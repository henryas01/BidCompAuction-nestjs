import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bid } from './bid.entity';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';
import { FlashsaleModule } from '../flashsale/flashsale.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bid]), FlashsaleModule],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}
