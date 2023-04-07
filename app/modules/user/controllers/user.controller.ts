import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/modules/user/services/user.service';
import { CurrentUser } from '@app/modules/user/decorators/current-user.decorator';
import { TokenPayload } from '@app/modules/user/interfaces/token-payload.interface';
import { UserEntity } from '@app/modules/user/entities/user.entity';
import { OnlyAuthorizedGuard } from '@app/modules/user/guards/only-authorized.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(OnlyAuthorizedGuard)
  public getMe(@CurrentUser() tokenPayload: TokenPayload): Promise<UserEntity> {
    return this.userService.findById(tokenPayload.id);
  }

  @Get(':id')
  public getUserById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findById(id);
  }
}
