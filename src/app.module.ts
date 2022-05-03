import { Module } from '@nestjs/common';
import { JemaatModule } from './jemaat/jemaat.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './database/db.module';
import { ConfigModule } from '@nestjs/config';
import { BaptisModule } from './baptis/baptis.module';
import { MuridModule } from './murid/murid.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.development.env' }),
    JemaatModule,
    AuthModule,
    DbModule,
    BaptisModule,
    MuridModule,
  ],
})
export class AppModule {}
