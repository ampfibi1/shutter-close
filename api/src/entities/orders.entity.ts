import { Check, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { Relation } from 'typeorm';
import { User } from "./users.entity.js";
import { OrderStatus } from "./enums/order_status.enum.js";
import { OrderItem } from "./order_items.entity.js";
import { Payment } from "./payments.entity.js";
import { CoinTransaction } from "./coin_transactions.entity.js";

@Entity('orders')
@Index('IDX_orders_orderNumber', ['orderNumber'], { unique: true })
@Index('IDX_orders_userId', ['userId'])
@Index('IDX_orders_status_createdAt', ['orderStatus', 'createdAt'])
@Check('CHK_orders_subtotal', '"subtotal" >= 0')
@Check('CHK_orders_discount', '"discountAmount" >= 0')
@Check('CHK_orders_delivery_fee', '"deliveryFee" >= 0')
@Check('CHK_orders_total', '"totalAmount" >= 0')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 40 })
  orderNumber: string;

  // Nullable to support guest checkout.
  @ManyToOne(() => User, (user) => user.orders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  user: Relation<User> | null;

  @Column({ type: 'uuid', nullable: true })
  userId: string | null;

  // Snapshot: retain the details used when the order was placed.
  @Column({ type: 'varchar', length: 120 })
  customerName: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'text' })
  shippingAddress: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  subtotal: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  discountAmount: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  deliveryFee: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  totalAmount: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  orderStatus: OrderStatus;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: Relation<OrderItem[]>;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Relation<Payment[]>;

  @OneToMany(
    () => CoinTransaction,
    (transaction) => transaction.order,
  )
  coinTransactions: Relation<CoinTransaction[]>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
