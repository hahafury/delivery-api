import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  InvalidCredentialsException,
  UserNotFoundException,
} from '../exceptions';
import { UserRepository } from '../user.repository';
import { UserPinHelper } from '../helpers';
import { UserEntity } from '../entities';
import { Tokens } from '../interfaces';
import { TokenPayload } from '../interfaces';
import { UserJwtService } from './user-jwt.service';

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
      relations: {
        credentials: true,
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
    await this.userRepository.save({
      ...user,
      credentials: {
        ...user.credentials,
        pin: pin,
      },
    });
    return pin;
  }

  public async loginViaPin(phone: string, pin: string): Promise<Tokens> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        phone: phone,
      },
      relations: {
        credentials: true,
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
