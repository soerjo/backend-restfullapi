import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateJemaatDto,
  ResponseCreateDto,
  ResponseDto,
  UpdateJemaatDto,
} from './dto';
import { PageOptionDto } from 'src/common/dto';
import { Jemaat } from './entities/jemaat.entity';
import { JemaatRepository } from './jemaat.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JemaatQueryDto } from './dto/query-get.dto';

@Injectable()
export class JemaatService {
  constructor(
    @InjectRepository(JemaatRepository, 'MYSQL_DB')
    private jemaatRepo: JemaatRepository,
  ) {}

  async create(createJemaatDto: CreateJemaatDto) {
    const checkDuplicate = await this.findByName(createJemaatDto.nama_lengkap);
    if (checkDuplicate)
      throw new BadRequestException(
        `data name: ${createJemaatDto.nama_lengkap} is already exist!`,
      );

    const response: Jemaat = await this.jemaatRepo.save(createJemaatDto);
    const data = new ResponseCreateDto(response);
    return new ResponseDto({ data, status: 201 });
  }

  async findAll(pageOptions: PageOptionDto, queryJemaat: JemaatQueryDto) {
    const { word, search, orderBy } = queryJemaat;
    try {
      return await this.jemaatRepo.pagination(
        pageOptions,
        word,
        search as keyof Jemaat,
        orderBy as keyof Jemaat,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    const data = await this.findById(id);
    return new ResponseDto({ data });
  }

  async findByName(name: string) {
    const data = await this.jemaatRepo.findOne({ nama_lengkap: name });
    return data;
  }

  async findById(id: string) {
    const data = await this.jemaatRepo.findOne(id);
    if (!data) throw new NotFoundException(`data id: ${id} is not found!`);
    return data;
  }

  async update(id: string, updateJemaatDto: UpdateJemaatDto) {
    const jemaat = await this.findById(id);

    const response: Jemaat = await this.jemaatRepo.save({
      ...jemaat,
      ...updateJemaatDto,
    });

    const data = new ResponseCreateDto(response);
    return new ResponseDto({ data });
  }

  async remove(id: string) {
    const data = await this.findById(id);
    await this.jemaatRepo.remove(data);
    return new ResponseDto({
      message: `data name: ${data.nama_lengkap} has deleted!`,
    });
  }
}
