import {  Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { Relation } from 'typeorm';
import { Order } from "./orders.entity.js";
import { PaymentMethod } from "./enums/payment_method.enum.js";
import { PaymentType } from "./enums/payment_type.enum.js";
import { PaymentStatus } from "./enums/payment_status.enum.js";

@Entity('payments')
@Index('IDX_payments_orderId', ['orderId'])
@Index('IDX_payments_transactionReference', ['transactionReference'])
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.payments, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'orderId' })
  order: Relation<Order>;

  @Column({ type: 'uuid' })
  orderId: string;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  method: PaymentMethod;

  @Column({
    type: 'enum',
    enum: PaymentType,
  })
  paymentType: PaymentType;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  amount: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  transactionReference: string | null;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
