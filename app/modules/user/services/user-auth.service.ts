import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@app/modules/user/user.repository';
import { UserPinHelper } from '@app/modules/user/helpers/user-pin.helper';
import { UserEntity } from '@app/modules/user/entities/user.entity';
import { UserNotFoundException } from '@app/common/exceptions/user-not-found.exception';
import { InvalidCredentialsException } from '@app/common/exceptions/invalid-credentials.exception';
import { UserJwtService } from '@app/modules/user/services/user-jwt.service';
import { Tokens } from '@app/modules/user/interfaces/tokens.interface';
import { TokenPayload } from '@app/modules/user/interfaces/token-payload.interface';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly userJwtService: UserJwtService,
    private readonly userRepository: UserRepository,
  ) {}

  public async sendPin(phone: string): Promise<string> {
    const pin: string = await UserPinHelper.generate();
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        phone: phone,
      },
    });

    if (!user) {
      await this.userRepository.save({
        phone: phone,
        credentials: {
          pin: pin,
        },
      });

      return pin;
    }

    return pin;
  }

  public async loginViaPin(phone: string, pin: string): Promise<Tokens> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        phone: phone,
      },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    const isPinCorrect: boolean = await UserPinHelper.compare(
      user.credentials.pin,
      pin,
    );

    if (!isPinCorrect) {
      throw new InvalidCredentialsException();
    }

    const tokens: Tokens = await this.userJwtService.generateTokens({
      id: user.id,
    });
    const hashedRefreshToken: string = await bcrypt.hash(
      tokens.refreshToken,
      10,
    );

    await this.userRepository.save({
      ...user,
      credentials: {
        ...user.credentials,
        currentHashedRefreshToken: hashedRefreshToken,
        pin: pin,
      },
    });

    return tokens;
  }

  public async verifyAccessToken(accessToken: string): Promise<TokenPayload> {
    return this.userJwtService.verifyAccessToken(accessToken);
  }

  public async refreshAccessToken(refreshToken: string): Promise<string> {
    const tokenPayload: TokenPayload =
      await this.userJwtService.verifyRefreshToken(refreshToken);

    return this.userJwtService.generateAccessToken(tokenPayload);
  }
}
