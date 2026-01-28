import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FlashSale } from './flashsale.entity';
import { calculateCountdown } from '../common/utils/countdown.util';
import { UpdateFlashsaleDto } from './dto/update-flashsale.dto';

type FlashsaleResponse = FlashSale & {
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    expired: boolean;
  };
};

@Injectable()
export class FlashsaleService {
  constructor(
    @InjectRepository(FlashSale)
    private readonly repo: Repository<FlashSale>,
  ) {}

  async create(data: Partial<FlashSale>) {
    const entity = this.repo.create({
      ...data,
      isActive: true,
      isExpired: false,
    });

    return this.repo.save(entity);
  }

  /**
   * Only return active & not expired flash sale
   * Auto update expired flag
   */
  async findAllActive() {
    const flashsales = await this.repo.find({
      where: {
        isActive: true,
        isExpired: false,
      },
      order: {
        endAt: 'ASC',
      },
    });

    const result: FlashsaleResponse[] = [];

    for (const fs of flashsales) {
      const countdown = calculateCountdown(fs.endAt);

      if (countdown.expired) {
        fs.isExpired = true;
        fs.isActive = false;
        await this.repo.save(fs);
        continue;
      }

      result.push({
        ...fs,
        countdown,
      });
    }

    return result;
  }

  async findOne(id: number) {
    const flashsale = await this.repo.findOne({ where: { id } });
    if (!flashsale) {
      throw new NotFoundException('Flash sale not found');
    }
    return flashsale;
  }

  async update(id: number, dto: UpdateFlashsaleDto & { images?: string[] }) {
    const flashsale = await this.findOne(id);

    if (dto.startAt) flashsale.startAt = new Date(dto.startAt);
    if (dto.endAt) flashsale.endAt = new Date(dto.endAt);

    if (dto.name !== undefined) flashsale.name = dto.name;
    if (dto.price !== undefined) flashsale.price = dto.price;
    if (dto.stock !== undefined) flashsale.stock = dto.stock;
    if (dto.descriptions !== undefined)
      flashsale.descriptions = dto.descriptions;
    if (dto.isActive !== undefined) flashsale.isActive = dto.isActive;

    // ✅ APPEND IMAGE (INI KUNCI)
    if (dto.images && dto.images.length) {
      flashsale.images = [...(flashsale.images ?? []), ...dto.images];
    }

    return this.repo.save(flashsale);
  }

  async remove(id: number) {
    const flashsale = await this.findOne(id);
    return this.repo.remove(flashsale);
  }
}
