import { ProductWeightUnit } from '../enums';
import { IsEnum, IsInt } from 'class-validator';

export class ProductWeightDto {
  @IsEnum(ProductWeightUnit)
  public readonly unit: ProductWeightUnit;

  @IsInt()
  public readonly value: number;
}
