import { IsNotEmpty, IsString } from 'class-validator';

export class UserAuthRefreshAuthorizationDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
