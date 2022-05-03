import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { JemaatService } from './jemaat.service';
import { JemaatController } from './jemaat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jemaat } from './entities/jemaat.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Jemaat], 'MYSQL_DB')],
  controllers: [JemaatController],
  providers: [
    JemaatService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class JemaatModule {}
