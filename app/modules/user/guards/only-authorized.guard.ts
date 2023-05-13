import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserService, UserAuthService } from '../services';
import { TokenPayload } from '../interfaces';
import { TokenNotFoundException, UserNotFoundException } from '../exceptions';
import { UserEntity } from '../entities';

@Injectable()
export class OnlyAuthorizedGuard implements CanActivate {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const authToken: string = request.session.authorization;
    if (!authToken) {
      throw new TokenNotFoundException();
    }
    const tokenPayload: TokenPayload =
      await this.userAuthService.verifyAccessToken(authToken);
    const user: UserEntity = await this.userService.findOneBy({
      id: tokenPayload.id,
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    request.user = user;
    return true;
  }
}
