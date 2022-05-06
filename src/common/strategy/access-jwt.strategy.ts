import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadJwtDto } from 'src/auth/dto';
import { CacheEntity } from 'src/auth/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(
  Strategy,
  'access-jwt',
) {
  private logger = new Logger(AccessJwtStrategy.name);
  constructor(
    @InjectRepository(CacheEntity, 'MYSQL_DB')
    private readonly cacheRepo: Repository<CacheEntity>,
    configService: ConfigService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('KEY_ACCESS_TOKEN'),
    });
  }

  async validate(args: any) {
    const payload = new PayloadJwtDto(args);
    const getUser = await this.cacheRepo.findOne({ userid: payload.userid });
    if (!getUser) return null;

    return payload;
  }
}
