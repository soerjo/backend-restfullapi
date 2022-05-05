import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
import { PayloadJwtDto } from 'src/auth/dto';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  private logger = new Logger(RefreshJwtStrategy.name);
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('KEY_REFRESH_TOKEN'),
    });
  }

  async validate(args: any) {
    const payload = new PayloadJwtDto(args);
    this.logger.log(`====> HIT!`, payload);
    const getUser = await this.authService.findCache(payload.userid);
    if (!getUser) return null;

    return payload;
  }
}
