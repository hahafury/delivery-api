import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserNotFoundException } from '@app/common/exceptions';
import { Request } from 'express';
import { UserService } from '../services';
import { TokenPayload } from '../interfaces';
import { UserEntity } from '../entities';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: string[] = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest<Request>();
    const user: TokenPayload = request.user;
    const foundUser: UserEntity = await this.userService.findOneBy({
      id: user.id,
    });
    if (!foundUser) {
      throw new UserNotFoundException();
    }
    const isUserRoleMatched: boolean = roles.some(
      (role) => role === foundUser.role,
    );
    if (!isUserRoleMatched) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
