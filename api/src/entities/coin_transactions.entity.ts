import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from 'typeorm';
import { User } from "./users.entity.js";
import { Order } from "./orders.entity.js";
import { CoinTransactionType } from "./enums/CoinTransactionType .enum.js";

@Entity('coin_transactions')
@Index('IDX_coin_transactions_userId', ['userId', 'createdAt'])
export class CoinTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.coinTransactions, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => Order, (order) => order.coinTransactions, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'orderId' })
  order: Relation<Order> | null;

  @Column({ type: 'uuid', nullable: true })
  orderId: string | null;

  // Positive number of coins; type indicates the operation.
  @Column({ type: 'integer' })
  coins: number;

  @Column({
    type: 'enum',
    enum: CoinTransactionType,
  })
  type: CoinTransactionType;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
