import { IsString, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  public readonly title: string;

  @IsUrl()
  public readonly image: string;
}
