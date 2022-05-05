import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JemaatService } from './jemaat.service';
import { CreateJemaatDto } from './dto';
import { UpdateJemaatDto } from './dto';
import { PageOptionDto } from 'src/common/dto';
import { QueryGetDto } from './dto/query-get.dto';
import { AccessJwtGuard } from 'src/common/guard';
import { Roles } from 'src/common/decorator';
import { Role } from 'src/common/type';

@ApiTags('jemaat')
@ApiBearerAuth()
@Controller('jemaat')
@UseGuards(AccessJwtGuard)
export class JemaatController {
  constructor(private readonly jemaatService: JemaatService) {}

  @Post()
  create(@Body() createJemaatDto: CreateJemaatDto) {
    return this.jemaatService.create(createJemaatDto);
  }

  @Get()
  findAll(@Query() query: QueryGetDto) {
    const { search, orderBy, word, ...pageOptions } = query;
    return this.jemaatService.findAll(pageOptions as PageOptionDto, {
      word,
      search,
      orderBy,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jemaatService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJemaatDto: UpdateJemaatDto) {
    return this.jemaatService.update(id, updateJemaatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jemaatService.remove(id);
  }
}
