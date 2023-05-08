import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from '../services';
import { CurrentUser } from '../decorators';
import { TokenPayload } from '../interfaces';
import { UserEntity } from '../entities';
import { OnlyAuthorizedGuard } from '../guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(OnlyAuthorizedGuard)
  public getMe(@CurrentUser() tokenPayload: TokenPayload): Promise<UserEntity> {
    return this.userService.findOne({ id: tokenPayload.id });
  }

  @Get(':id')
  public show(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne({ id: id });
  }
}
