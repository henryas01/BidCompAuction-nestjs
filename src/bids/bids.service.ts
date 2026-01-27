import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Bid } from './bid.entity';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { FlashsaleService } from 'src/flashsale/flashsale.service';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Bid)
    private readonly bidRepo: Repository<Bid>,
    private readonly flashSaleService: FlashsaleService,
  ) {}

  async create(dto: CreateBidDto, userId: number) {
    const flashSale = await this.flashSaleService.findOne(dto.flashSaleId);

    if (!flashSale || !flashSale.isActive || flashSale.isExpired) {
      throw new BadRequestException('Flash sale not active');
    }

    const highestBid = await this.bidRepo.findOne({
      where: { flashSaleId: dto.flashSaleId },
      order: { bidPrice: 'DESC' },
    });

    if (dto.bidPrice <= flashSale.price) {
      throw new BadRequestException(
        'Bid price must be higher than flash sale price',
      );
    }

    if (highestBid && dto.bidPrice <= highestBid.bidPrice) {
      throw new BadRequestException(
        'Bid must be higher than current highest bid',
      );
    }

    if (highestBid) {
      highestBid.isHighest = false;
      await this.bidRepo.save(highestBid);
    }

    const bid = this.bidRepo.create({
      flashSaleId: dto.flashSaleId,
      userId,
      basePrice: flashSale.price,
      bidPrice: dto.bidPrice,
      isHighest: true,
      status: 'PENDING',
    });

    return this.bidRepo.save(bid);
  }

  findAll() {
    return this.bidRepo.find({
      order: { bidPrice: 'DESC' },
      relations: ['flashSale'],
    });
  }

  async findMyBids(userId: number) {
    if (!userId) {
      throw new BadRequestException('User not authenticated');
    }

    return this.bidRepo.find({
      where: { userId },
      order: { bidPrice: 'DESC' },
      relations: ['flashSale'], // mungkin butuh saat relasi flash sale
    });
  }

  findOne(id: number) {
    return this.bidRepo.findOne({ where: { id }, relations: ['flashSale'] });
  }

  async update(id: number, dto: UpdateBidDto) {
    const bid = await this.findOne(id);
    if (!bid) throw new NotFoundException('Bid not found');

    Object.assign(bid, dto);
    return this.bidRepo.save(bid);
  }

  async remove(id: number) {
    const bid = await this.findOne(id);
    if (!bid) throw new NotFoundException('Bid not found');

    return this.bidRepo.remove(bid);
  }

  async selectWinner(bidId: number) {
    const bid = await this.findOne(bidId);
    if (!bid) throw new NotFoundException('Bid not found');

    // set semua bid lain jadi LOSE
    await this.bidRepo.update(
      { flashSaleId: bid.flashSaleId },
      { status: 'LOSE' },
    );

    bid.status = 'WINNER';
    bid.isHighest = true;

    return this.bidRepo.save(bid);
  }
}
