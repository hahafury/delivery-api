import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ProductCategoryDto } from './product-category.dto';
import { ProductNutritionalValueDto } from './product-nutritional-value.dto';
import { ProductWeightDto } from '@app/modules/product/dto/product-weight.dto';
import { ProductImagesDto } from '@app/modules/product/dto/product-images.dto';
import { IsBiggerThan } from '@app/common/validators/is-bigger-than.validator';

export class CreateProductDto {
  @IsString()
  public readonly title: string;

  @IsUrl()
  public readonly preview: string;

  @IsString()
  public readonly description: string;

  @IsInt()
  @IsBiggerThan(0)
  public readonly price: number;

  @IsNotEmpty()
  @IsNotEmptyObject()
  @Type(() => ProductCategoryDto)
  @ValidateNested()
  public readonly category: ProductCategoryDto;

  @IsNotEmpty()
  @IsNotEmptyObject()
  @Type(() => ProductWeightDto)
  @ValidateNested()
  public readonly weight: ProductWeightDto;

  @IsNotEmpty()
  @IsNotEmptyObject()
  @Type(() => ProductNutritionalValueDto)
  @ValidateNested()
  public readonly nutritionalValue: ProductNutritionalValueDto;

  // @IsNotEmpty()
  // @IsNotEmptyObject()
  // @Type(() => ProductImagesDto)
  // @ValidateNested()
  // public readonly images: ProductImagesDto[];
}
