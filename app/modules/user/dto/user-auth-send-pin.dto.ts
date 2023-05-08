import { IsNotEmpty, IsString } from 'class-validator';

export class UserAuthSendPinDto {
  @IsString()
  @IsNotEmpty()
  public readonly phone: string;
}
