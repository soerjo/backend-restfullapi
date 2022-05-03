import { Injectable } from '@nestjs/common';
import { CreateMuridDto } from './dto/create-murid.dto';
import { UpdateMuridDto } from './dto/update-murid.dto';

@Injectable()
export class MuridService {
  create(createMuridDto: CreateMuridDto) {
    return 'This action adds a new murid';
  }

  findAll() {
    return `This action returns all murid`;
  }

  findOne(id: number) {
    return `This action returns a #${id} murid`;
  }

  update(id: number, updateMuridDto: UpdateMuridDto) {
    return `This action updates a #${id} murid`;
  }

  remove(id: number) {
    return `This action removes a #${id} murid`;
  }
}
