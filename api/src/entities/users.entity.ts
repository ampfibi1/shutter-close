import {  Column, CreateDateColumn, Entity, Index,  OneToMany,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { Relation } from 'typeorm';
import { Order } from "./orders.entity.js";
import { UserRole } from "./enums/role.enum.js";
import { Address } from "./addresses.entity.js";
import { CoinTransaction } from "./coin_transactions.entity.js";
import { ShopSetting } from "./shop_settings.entity.js";
import { AdminAuditLog } from "./admin_audit_logs.entity.js";

@Entity('users')
@Index('IDX_users_email', ['email'], { unique: true })
@Index('IDX_users_phone', ['phone'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 180 })
  email: string;

  @Column({ type: 'varchar', length: 255, select: false })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @Column({ type: 'integer', default: 0 })
  coinBalance: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Relation<Address[]>;

  @OneToMany(() => Order, (order) => order.user)
  orders: Relation<Order[]>;

  @OneToMany(
    () => CoinTransaction,
    (transaction) => transaction.user,
  )
  coinTransactions: Relation<CoinTransaction[]>;

  @OneToMany(() => ShopSetting, (setting) => setting.updatedBy)
  updatedSettings: Relation<ShopSetting[]>;

  @OneToMany(() => AdminAuditLog, (log) => log.admin)
  auditLogs: Relation<AdminAuditLog[]>;
}
