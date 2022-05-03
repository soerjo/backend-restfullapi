import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MuridService } from './murid.service';
import { CreateMuridDto } from './dto/create-murid.dto';
import { UpdateMuridDto } from './dto/update-murid.dto';

@Controller('murid')
export class MuridController {
  constructor(private readonly muridService: MuridService) {}

  @Post()
  create(@Body() createMuridDto: CreateMuridDto) {
    return this.muridService.create(createMuridDto);
  }

  @Get()
  findAll() {
    return this.muridService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.muridService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMuridDto: UpdateMuridDto) {
    return this.muridService.update(+id, updateMuridDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.muridService.remove(+id);
  }
}
