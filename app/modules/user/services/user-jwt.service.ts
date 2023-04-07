import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { Tokens } from '@app/modules/user/interfaces/tokens.interface';
import { TokenPayload } from '@app/modules/user/interfaces/token-payload.interface';
import { JWT_CONFIG } from '@app/modules/user/jwt.config';
import { InvalidTokenException } from '@app/common/exceptions/invalid-token.exception';

@Injectable()
export class UserJwtService {
  constructor(private jwtService: JwtService) {}

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

  public async verifyAccessToken(accessToken: string): Promise<TokenPayload> {
    try {
      const tokenPayload: TokenPayload =
        await this.jwtService.verifyAsync<TokenPayload>(accessToken, {
          secret: JWT_CONFIG.ACCESS_TOKEN_SECRET,
        });
      return tokenPayload;
    } catch (error) {
      throw new InvalidTokenException();
    }
  }

  public async verifyRefreshToken(token: string): Promise<TokenPayload> {
    try {
      const tokenPayload = await this.jwtService.verifyAsync(token, {
        secret: JWT_CONFIG.REFRESH_TOKEN_SECRET,
      });
      return tokenPayload;
    } catch (error) {
      throw new InvalidTokenException();
    }
  }
}
