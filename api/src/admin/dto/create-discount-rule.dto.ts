import {  IsString,  IsEnum,  IsNumber,  IsDateString,  IsBoolean,  IsOptional,  Min,  MaxLength,} from 'class-validator';
import { Type } from 'class-transformer';
import { DiscountType } from '../../entities/enums/discount_type.enum.js';
import { DiscountRuleType } from '../../entities/enums/discount_rule_type.enum.js';

export class CreateDiscountRuleDto {
  @IsString()
  @MaxLength(150)
  name: string;

  @IsEnum(DiscountRuleType)
  type: DiscountRuleType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  minimumSpend?: number = 0;

  @IsEnum(DiscountType)
  discountType: DiscountType;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  discountValue: number;

  @IsDateString()
  startsAt: string;

  @IsDateString()
  endsAt: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
