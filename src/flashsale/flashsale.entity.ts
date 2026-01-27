import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Bid } from '../bids/bid.entity';

@Entity('flash_sales')
export class FlashSale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  stock: number;

  @Column('text')
  desc: string;

  @Column('simple-array')
  images: string[];

  @Column({ type: 'timestamp' })
  startAt: Date;

  @Column({ type: 'timestamp' })
  endAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isExpired: boolean;

  // 🔥 RELATION KE BID
  @OneToMany(() => Bid, (bid) => bid.flashSale)
  bids: Bid[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
