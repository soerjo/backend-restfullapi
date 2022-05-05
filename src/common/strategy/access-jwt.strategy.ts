import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
import { PayloadJwtDto } from 'src/auth/dto';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(
  Strategy,
  'access-jwt',
) {
  private logger = new Logger(AccessJwtStrategy.name);

  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('KEY_ACCESS_TOKEN'),
    });
  }

  async validate(payload: PayloadJwtDto) {
    const getUser = await this.authService.findCache(payload.userid);
    if (!getUser) return null;

    return payload;
  }
}
