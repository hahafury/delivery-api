import { IsOptional, IsString } from 'class-validator';

export class ProductIndexQueryDto {
  @IsOptional()
  @IsString()
  public readonly limit: string | undefined;

  @IsOptional()
  @IsString()
  public readonly page: string | undefined;

  @IsOptional()
  @IsString()
  public readonly category: string | undefined;
}
