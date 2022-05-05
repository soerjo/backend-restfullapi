import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CacheEntity } from './entities/cache.entity';
import { RecoverUser } from './entities/recover-user.entity';
import { AccessJwtStrategy, RefreshJwtStrategy } from 'src/common/strategy';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User, CacheEntity, RecoverUser], 'MYSQL_DB'),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessJwtStrategy, RefreshJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
