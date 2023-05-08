import {
  Body,
  Controller,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { UserAuthService } from '../services';
import {
  UserAuthLoginViaPinDto,
  UserAuthSendPinDto,
  UserAuthRefreshAuthorizationDto,
} from '../dto';
import { Tokens } from '../interfaces';

@Controller('auth')
export class AuthUserController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('send/pin')
  @UsePipes(ValidationPipe)
  public sendPin(@Body() data: UserAuthSendPinDto): Promise<string> {
    return this.userAuthService.sendPin(data.phone);
  }

  @Post('login/pin')
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

  @Post('refresh')
  public async refreshAccess(
    @Req() req: Request,
    @Body(ValidationPipe) data: UserAuthRefreshAuthorizationDto,
  ): Promise<void> {
    req.session.authorization = await this.userAuthService.refreshAccessToken(
      data.refreshToken,
    );
  }
}
