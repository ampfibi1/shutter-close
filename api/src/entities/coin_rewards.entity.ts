import { Check, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import type { Relation } from 'typeorm';
import { Product } from "./products.entity.js";

@Entity('coin_rewards')
@Unique('UQ_coin_rewards_productId', ['productId'])
@Check('CHK_coin_rewards_cost', '"coinCost" > 0')
@Check('CHK_coin_rewards_stock', '"stockQuantity" >= 0')
export class CoinReward {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product, (product) => product.coinReward, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Relation<Product>;

  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'integer' })
  coinCost: number;

  @Column({ type: 'integer', default: 0 })
  stockQuantity: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

