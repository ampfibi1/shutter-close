import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,CreateDateColumn,Index,} from 'typeorm';

import type { Relation } from 'typeorm';
import { Product } from './products.entity.js';

@Entity('product_images')
@Index('IDX_product_images_productId', ['productId'])
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  imageUrl: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  publicId: string | null;

  @Column({ type: 'boolean', default: false })
  isPrimary: boolean;

  @Column({ type: 'integer', default: 0 })
  sortOrder: number;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Relation<Product>;

  @Column({ type: 'uuid' })
  productId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}