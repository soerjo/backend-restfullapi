import { Module } from '@nestjs/common';
import { MuridService } from './murid.service';
import { MuridController } from './murid.controller';

@Module({
  controllers: [MuridController],
  providers: [MuridService],
})
export class MuridModule {}
