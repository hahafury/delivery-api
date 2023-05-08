import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class UserAuthLoginViaPinDto {
  @IsPhoneNumber('UA')
  @IsNotEmpty()
  public readonly phone: string;

  @IsString()
  @IsNotEmpty()
  public readonly pin: string;
}
