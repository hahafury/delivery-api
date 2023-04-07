import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class UserAuthLoginViaPinDto {
  @IsPhoneNumber('UA')
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  pin: string;
}
