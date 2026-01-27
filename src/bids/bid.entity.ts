import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FlashSale } from '../flashsale/flashsale.entity';

@Entity('bids')
export class Bid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  flashSaleId: number;

  @ManyToOne(() => FlashSale, (fs) => fs.bids, { eager: false })
  @JoinColumn({ name: 'flashSaleId' })
  flashSale: FlashSale;

  @Column()
  userId: number;

  @Column('decimal')
  basePrice: number;

  @Column('decimal')
  bidPrice: number;

  @Column({ default: false })
  isHighest: boolean;

  @Column({ default: 'PENDING' })
  status: 'PENDING' | 'WINNER' | 'LOSE';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
