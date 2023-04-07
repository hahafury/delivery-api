import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthUserController } from '@app/modules/user/controllers/auth-user.controller';
import { UserRepository } from '@app/modules/user/user.repository';
import { UserAuthService } from '@app/modules/user/services/user-auth.service';
import { UserJwtService } from '@app/modules/user/services/user-jwt.service';
import { UserService } from '@app/modules/user/services/user.service';
import { UserController } from '@app/modules/user/controllers/user.controller';

@Module({
  imports: [JwtModule],
  controllers: [AuthUserController, UserController],
  providers: [UserAuthService, UserService, UserJwtService, UserRepository],
})
export class UserModule {}
