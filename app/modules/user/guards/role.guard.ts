import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserService } from '../services';
import { TokenPayload } from '../interfaces';
import { UserEntity } from '../entities';
import { UserNotFoundException } from '@app/common/exceptions';

@Injectable()
export class RoleGuard implements CanActivate {
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
    return roles.some((role) => role === foundUser.role);
  }
}
