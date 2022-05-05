import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './database/db.module';
import { ConfigModule } from '@nestjs/config';
import { BaptisModule } from './module/baptis/baptis.module';
import { JemaatModule } from './module/jemaat/jemaat.module';
import { MuridModule } from './module/murid/murid.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessJwtStrategy } from './common/strategy/access-jwt.strategy';
import { RolesGuard } from './common/guard/role.guard';
import { RefreshJwtStrategy } from './common/strategy';
import { AccessJwtGuard } from './common/guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.development.env' }),
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
    {
      provide: APP_GUARD,
      useClass: AccessJwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
