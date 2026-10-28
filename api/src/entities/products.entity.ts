import { Check, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { Relation } from 'typeorm';
import { Category } from "./categories.entity.js";
import { ProductStatus } from "./enums/product_status.enum.js";
import { ProductPaymentOption } from "./product_payment_options.entity.js";
import { OrderItem } from "./order_items.entity.js";
import { CoinReward } from "./coin_rewards.entity.js";
import { ProductImage } from './product_images.entity.js';

@Entity('products')
@Index('IDX_products_categoryId', ['categoryId'])
@Check('CHK_products_price_nonnegative', '"price" >= 0')
@Check(
  'CHK_products_stock_nonnegative',
  '"stockQuantity" >= 0',
)
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Relation<Category>;

  @Column({ type: 'uuid' })
  categoryId: string;

  // PostgreSQL NUMERIC is suitable for money.
  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price: string;

  @Column({ type: 'integer', default: 0 })
  stockQuantity: number;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.DRAFT,
  })
  status: ProductStatus;

  @OneToMany(
    () => ProductPaymentOption,
    (option) => option.product,
  )
  paymentOptions: Relation<ProductPaymentOption[]>;

  @OneToMany(() => OrderItem, (item) => item.product)
  orderItems: Relation<OrderItem[]>;

  @OneToOne(() => CoinReward, (reward) => reward.product)
  coinReward: Relation<CoinReward> | null;

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
  })
  images: Relation<ProductImage[]>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}