import { IsInt } from 'class-validator';

export class NutritionalValueDto {
  @IsInt()
  public readonly energy: number;

  @IsInt()
  public readonly proteins: number;

  @IsInt()
  public readonly fats: number;

  @IsInt()
  public readonly carbohydrates: number;
}
