import {IsEnum,IsInt,IsNotEmpty,IsOptional,IsString,IsUUID,Max,MaxLength,Min,MinLength,Matches,} from 'class-validator';
import { ProductStatus } from '../../entities/enums/product_status.enum.js';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string | null;

  @IsUUID()
  categoryId: string;

  // Decimal string compatible with PostgreSQL NUMERIC.
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'price must be a non-negative amount with at most 2 decimal places',
  })
  price: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1000000)
  stockQuantity?: number;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}