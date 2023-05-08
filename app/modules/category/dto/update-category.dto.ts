import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  public readonly title: string;

  @IsOptional()
  @IsUrl()
  public readonly image: string;
}
