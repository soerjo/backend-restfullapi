import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JemaatService } from './jemaat.service';
import { CreateJemaatDto } from './dto';
import { UpdateJemaatDto } from './dto';
import { PageOptionDto } from 'src/common/dto';
import { QueryGetDto, SearchQueryDto } from '../../common/dto/query-get.dto';

@ApiTags('jemaat')
@Controller('jemaat')
// @UseGuards(AccessJwtGuard)
export class JemaatController {
  constructor(private readonly jemaatService: JemaatService) {}

  @Post()
  create(@Body() createJemaatDto: CreateJemaatDto) {
    return this.jemaatService.create(createJemaatDto);
  }

  @Get()
  findAll(@Query() query: QueryGetDto) {
    return this.jemaatService.findAll(
      query as PageOptionDto,
      query as SearchQueryDto,
    );
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
