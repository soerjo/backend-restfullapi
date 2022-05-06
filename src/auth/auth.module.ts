import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, CacheEntity, RecoverUser } from './entities';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User, CacheEntity, RecoverUser], 'MYSQL_DB'),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
