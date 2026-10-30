import {IsBoolean,IsInt,IsString,IsUrl,Min,} from "class-validator";

export class ProductImageDto {
  @IsUrl({ protocols: ["https"], require_protocol: true })
  imageUrl: string;

  @IsString()
  publicId: string;

  @IsBoolean()
  isPrimary: boolean;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
