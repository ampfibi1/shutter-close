import {IsEnum,IsInt,IsNotEmpty,IsNumberString,IsOptional,IsString,IsUUID,Max,MaxLength,Min,MinLength,} from 'class-validator';
import { ProductStatus } from '../../entities/enums/product_status.enum.js';


export class CreateProductDto {
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

  // Keep money as a decimal string to match PostgreSQL NUMERIC.
  @IsNumberString(
    {},
    { message: 'price must be a valid numeric string' },
  )
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