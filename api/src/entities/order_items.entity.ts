import {  Column,  Entity, Index, JoinColumn, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from 'typeorm';
import { Product } from "./products.entity.js";
import { Order } from "./orders.entity.js";

@Entity('order_items')
@Index('IDX_order_items_orderId', ['orderId'])
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order: Relation<Order>;

  @Column({ type: 'uuid' })
  orderId: string;

  // Nullable because a product might be deleted in the future.
  // Its name and price snapshot remain available.
  @ManyToOne(() => Product, (product) => product.orderItems, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'productId' })
  product: Relation<Product> | null;

  @Column({ type: 'uuid', nullable: true })
  productId: string | null;

  @Column({ type: 'varchar', length: 200 })
  productName: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  unitPrice: string;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  discountAmount: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  lineTotal: string;
}