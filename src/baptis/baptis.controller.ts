import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaptisService } from './baptis.service';
import { CreateBaptiDto } from './dto/create-bapti.dto';
import { UpdateBaptiDto } from './dto/update-bapti.dto';

@Controller('baptis')
export class BaptisController {
  constructor(private readonly baptisService: BaptisService) {}

  @Post()
  create(@Body() createBaptiDto: CreateBaptiDto) {
    return this.baptisService.create(createBaptiDto);
  }

  @Get()
  findAll() {
    return this.baptisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baptisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaptiDto: UpdateBaptiDto) {
    return this.baptisService.update(+id, updateBaptiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baptisService.remove(+id);
  }
}
