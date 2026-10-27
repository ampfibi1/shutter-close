import { Column, CreateDateColumn, Entity, Index,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DiscountRuleType } from "./enums/discount_rule_type.enum.js";
import { DiscountType } from "./enums/discount_type.enum.js";

@Entity('discount_rules')
@Index('IDX_discount_rules_active_dates', ['isActive', 'startsAt', 'endsAt'])
export class DiscountRule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({
    type: 'enum',
    enum: DiscountRuleType,
  })
  type: DiscountRuleType;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  minimumSpend: string;

  @Column({
    type: 'enum',
    enum: DiscountType,
  })
  discountType: DiscountType;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  discountValue: string;

  @Column({ type: 'timestamptz' })
  startsAt: Date;

  @Column({ type: 'timestamptz' })
  endsAt: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
