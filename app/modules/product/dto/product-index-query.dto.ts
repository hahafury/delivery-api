import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsUUID,
  IsObject,
  IsNotEmptyObject,
} from 'class-validator';
import { BaseIndexQueryDto } from '@app/common/base';
import { Transform } from 'class-transformer';
import {
  TransformedOrderByParam,
  transformOrderByParamToObject,
  transformStringArrayToNumberArray,
} from '@app/common/transforms';
import { IsOrderBy } from '@app/common/validators';

export class ProductIndexQueryDto extends BaseIndexQueryDto {
  @IsOptional()
  @IsUUID()
  public readonly category?: string;

  @Transform(transformStringArrayToNumberArray)
  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  public readonly price?: (number | null)[];

  @Transform(transformOrderByParamToObject)
  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @IsOrderBy(['price'])
  public readonly orderBy?: TransformedOrderByParam<'price'>;
}
