import {IsUUID,IsInt,IsBoolean,IsOptional,Min,} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCoinRewardDto {
  @IsUUID()
  productId: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  coinCost: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  stockQuantity?: number = 0;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
