import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Payment } from './payment.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentId: number;

  @OneToOne(() => Payment, (payment) => payment.invoice)
  @JoinColumn({ name: 'paymentId' }) // 👈 WAJIB DI OWNING SIDE
  payment: Payment;

  @Column()
  invoiceNumber: string;

  @Column('decimal')
  amount: number;

  @CreateDateColumn()
  createdAt: Date;
}
