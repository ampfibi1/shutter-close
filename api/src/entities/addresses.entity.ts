import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity.js";
import type { Relation } from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 120 })
  recipientName: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  area: string;

  @ManyToOne(() => User, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @Column({ type: 'uuid' })
  userId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}