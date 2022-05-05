import { Module } from '@nestjs/common';
import { BaptisService } from './baptis.service';
import { BaptisController } from './baptis.controller';

@Module({
  controllers: [BaptisController],
  providers: [BaptisService],
})
export class BaptisModule {}
