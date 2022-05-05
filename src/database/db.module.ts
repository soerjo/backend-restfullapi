import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheEntity } from 'src/auth/entities/cache.entity';
import { User } from 'src/auth/entities/user.entity';
import { Jemaat } from 'src/module/jemaat/entities/jemaat.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'MYSQL_DB',
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [__dirname + './../**/*.entity{.ts,.js}'],
        // entities: [User, Jemaat, CacheEntity],
        // logging: true,
        synchronize: config.get('NODE_ENV') === 'development' ? true : false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
