import {  Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { Relation } from 'typeorm';
import { User } from "./users.entity.js";

@Entity('shop_settings')
@Index('IDX_shop_settings_settingKey', ['settingKey'], {
  unique: true,
})
export class ShopSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  settingKey: string;

  // Allows settings such as delivery fees, payment numbers,
  // coin conversion rates, and loyalty percentages.
  @Column({ type: 'jsonb' })
  settingValue: Record<string, unknown> | string | number | boolean;

  @ManyToOne(() => User, (user) => user.updatedSettings, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: Relation<User> | null;

  @Column({ type: 'uuid', nullable: true })
  updatedById: string | null;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
