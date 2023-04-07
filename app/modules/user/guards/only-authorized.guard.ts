import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserAuthService } from '@app/modules/user/services/user-auth.service';
import { Request } from 'express';
import { TokenNotFoundException } from '@app/common/exceptions/token-not-found.exception';
import { TokenPayload } from '@app/modules/user/interfaces/token-payload.interface';

@Injectable()
export class OnlyAuthorizedGuard implements CanActivate {
  constructor(private readonly userAuthService: UserAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const authToken: string = request.session.authorization;
    if (!authToken) {
      throw new TokenNotFoundException();
    }
    const tokenPayload: TokenPayload =
      await this.userAuthService.verifyAccessToken(authToken);
    request.user = tokenPayload;
    return true;
  }
}
