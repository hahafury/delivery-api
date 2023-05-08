import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthUserController, UserController } from './controllers';
import { UserRepository } from './user.repository';
import { UserAuthService, UserJwtService, UserService } from './services';

@Module({
  imports: [JwtModule],
  controllers: [AuthUserController, UserController],
  providers: [UserAuthService, UserService, UserJwtService, UserRepository],
})
export class UserModule {}
