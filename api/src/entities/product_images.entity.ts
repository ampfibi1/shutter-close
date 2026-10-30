import {Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn,} from 'typeorm';
import type { Relation } from 'typeorm';

import { Product } from './products.entity.js';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar'})
  imageUrl: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  publicId: string | null;

  @Column({ type: 'boolean', default: false })
  isPrimary: boolean;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Relation<Product>;
}