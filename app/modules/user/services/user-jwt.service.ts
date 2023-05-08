import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InvalidTokenException } from '@app/common/exceptions/invalid-token.exception';
import { TokenPayload, Tokens } from '../interfaces';
import { JWT_CONFIG } from '../jwt.config';

@Injectable()
export class UserJwtService {
  constructor(private readonly jwtService: JwtService) {}

  public async generateAccessToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: JWT_CONFIG.ACCESS_TOKEN_SECRET,
    });
  }

  public async generateTokens(payload: TokenPayload): Promise<Tokens> {
    const [accessToken, refreshToken]: string[] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: JWT_CONFIG.ACCESS_TOKEN_SECRET,
        expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: JWT_CONFIG.REFRESH_TOKEN_SECRET,
      }),
    ]);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  public verifyAccessToken(accessToken: string): Promise<TokenPayload> {
    try {
      return this.jwtService.verifyAsync<TokenPayload>(accessToken, {
        secret: JWT_CONFIG.ACCESS_TOKEN_SECRET,
      });
    } catch (error) {
      throw new InvalidTokenException();
    }
  }

  public verifyRefreshToken(token: string): Promise<TokenPayload> {
    try {
      return this.jwtService.verifyAsync<TokenPayload>(token, {
        secret: JWT_CONFIG.REFRESH_TOKEN_SECRET,
      });
    } catch (error) {
      throw new InvalidTokenException();
    }
  }
}
