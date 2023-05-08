import { IsInt, IsNotEmptyObject, IsOptional, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ProductCategoryDto } from './product-category.dto';
import { ProductNutritionalValueDto } from './product-nutritional-value.dto';
import { ProductWeightDto } from '@app/modules/product/dto/product-weight.dto';
import { ProductImagesDto } from '@app/modules/product/dto/product-images.dto';
import { IsBiggerThan } from '@app/common/validators/is-bigger-than.validator';
import { ProductDiscountDto } from '@app/modules/product/dto/product-discount.dto';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  public readonly title: string;

  @IsString()
  @IsOptional()
  public readonly preview: string;

  @IsString()
  @IsOptional()
  public readonly description: string;

  @IsInt()
  @IsBiggerThan(0)
  @IsOptional()
  public readonly price: number;

  @IsOptional()
  @Type(() => ProductCategoryDto)
  @Expose()
  public readonly category: ProductCategoryDto;

  @IsOptional()
  @Type(() => ProductWeightDto)
  @Expose()
  public readonly weight: ProductWeightDto;

  @IsOptional()
  @Type(() => ProductNutritionalValueDto)
  @Expose()
  public readonly nutritionalValue: ProductNutritionalValueDto;

  @IsOptional()
  @Type(() => ProductImagesDto)
  @Expose()
  public readonly images: ProductImagesDto[];

  @IsOptional()
  @IsNotEmptyObject()
  @Type(() => ProductDiscountDto)
  @Expose()
  public readonly discount: ProductDiscountDto;
}
