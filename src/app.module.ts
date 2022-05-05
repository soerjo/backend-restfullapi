import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './database/db.module';
import { ConfigModule } from '@nestjs/config';
import { BaptisModule } from './module/baptis/baptis.module';
import { JemaatModule } from './module/jemaat/jemaat.module';
import { MuridModule } from './module/murid/murid.module';

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
