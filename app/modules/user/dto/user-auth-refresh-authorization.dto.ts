import { IsNotEmpty, IsString } from 'class-validator';

export class UserAuthRefreshAuthorizationDto {
  @IsString()
  @IsNotEmpty()
  public readonly refreshToken: string;
}
