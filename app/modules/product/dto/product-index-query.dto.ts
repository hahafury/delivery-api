import { IsOptional, IsString } from 'class-validator';

export class ProductIndexQueryDto {
  @IsOptional()
  @IsString()
  public limit: string | undefined;

  @IsOptional()
  @IsString()
  public page: string | undefined;

  @IsOptional()
  @IsString()
  public category: string | undefined;
}
