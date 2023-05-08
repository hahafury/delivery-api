import { IsUUID } from 'class-validator';

export class ProductCategoryDto {
  @IsUUID()
  public readonly id: string;
}
