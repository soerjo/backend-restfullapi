import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { JemaatService } from './jemaat.service';
import { JemaatController } from './jemaat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JemaatRepository } from './jemaat.repository';

@Module({
  imports: [TypeOrmModule.forFeature([JemaatRepository], 'MYSQL_DB')],
  controllers: [JemaatController],
  providers: [
    JemaatRepository,
    JemaatService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class JemaatModule {}
