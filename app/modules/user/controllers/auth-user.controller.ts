import { Body, Controller, Post, Req, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { UserAuthService } from '@app/modules/user/services/user-auth.service';
import { UserAuthLoginViaPinDto } from '@app/modules/user/dto/user-auth-login-via-pin.dto';
import { Tokens } from '@app/modules/user/interfaces/tokens.interface';
import { UserAuthSendPinDto } from '@app/modules/user/dto/user-auth-send-pin.dto';
import { UserAuthRefreshAuthorizationDto } from '@app/modules/user/dto/user-auth-refresh-authorization.dto';

@Controller('auth')
export class AuthUserController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('/send/pin')
  public sendPin(
    @Body(ValidationPipe) data: UserAuthSendPinDto,
  ): Promise<string> {
    return this.userAuthService.sendPin(data.phone);
  }

  @Post('/login/pin')
  public async loginViaPin(
    @Req() req: Request,
    @Body(ValidationPipe) data: UserAuthLoginViaPinDto,
  ): Promise<{ refreshToken: string }> {
    const tokens: Tokens = await this.userAuthService.loginViaPin(
      data.phone,
      data.pin,
    );
    req.session.authorization = tokens.accessToken;
    return {
      refreshToken: tokens.refreshToken,
    };
  }

  @Post('/refresh')
  public async refreshAccess(
    @Req() req: Request,
    @Body(ValidationPipe) data: UserAuthRefreshAuthorizationDto,
  ): Promise<void> {
    req.session.authorization = await this.userAuthService.refreshAccessToken(
      data.refreshToken,
    );
  }
}
