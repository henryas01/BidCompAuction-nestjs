import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column('decimal')
  price: number;

  @ApiProperty()
  @Column('simple-array', { nullable: true })
  images: string[];

  @ApiProperty()
  @Column()
  stock: number;

  @ApiProperty()
  @Column('text')
  desc: string;
}
