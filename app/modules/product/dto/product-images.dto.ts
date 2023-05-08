import { IsOptional, IsString, IsUrl } from 'class-validator';

export class ProductImagesDto {
  @IsUrl()
  public readonly uri: string;

  @IsString()
  @IsOptional()
  public readonly alt?: string;
}
