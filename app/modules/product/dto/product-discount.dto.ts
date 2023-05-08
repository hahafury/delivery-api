import { IsEnum, IsInt } from 'class-validator';
import { ProductDiscountType } from '../enums';

export class ProductDiscountDto {
  @IsInt()
  public readonly value: number;

  @IsEnum(ProductDiscountType)
  public readonly type: ProductDiscountType;
}
