import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './database/db.module';
import { ConfigModule } from '@nestjs/config';
import { BaptisModule } from './module/baptis/baptis.module';
import { JemaatModule } from './module/jemaat/jemaat.module';
import { MuridModule } from './module/murid/murid.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AccessJwtStrategy } from './common/strategy/access-jwt.strategy';
import { RefreshJwtStrategy } from './common/strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, CacheEntity, RecoverUser } from './auth/entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.development.env' }),
    TypeOrmModule.forFeature([User, CacheEntity, RecoverUser], 'MYSQL_DB'),
    JemaatModule,
    AuthModule,
    DbModule,
    BaptisModule,
    MuridModule,
  ],
  providers: [
    AccessJwtStrategy,
    RefreshJwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
