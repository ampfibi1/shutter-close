import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import type { Relation } from 'typeorm';
import { Product } from "./products.entity.js";
import { PaymentMethod } from "./enums/payment_method.enum.js";

@Entity('product_payment_options')
@Unique(
  'UQ_product_payment_option',
  ['productId', 'paymentMethod'],
)
export class ProductPaymentOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.paymentOptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Relation<Product>;

  @Column({ type: 'uuid' })
  productId: string;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
