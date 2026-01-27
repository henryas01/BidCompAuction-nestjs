import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({
    type: 'enum',
    enum: ['BID', 'PRODUCT'],
  })
  sourceType: 'BID' | 'PRODUCT';

  @Column()
  sourceId: number;

  @Column('decimal')
  amount: number;

  @Column('simple-array')
  proofImages: string[];

  @Column({ default: 'PENDING' })
  status: 'PENDING' | 'PAID' | 'REJECTED';

  @OneToOne(() => Invoice, (invoice) => invoice.payment)
  invoice: Invoice;

  @CreateDateColumn()
  createdAt: Date;
}
