import { Injectable } from '@nestjs/common';
import { CreateBaptiDto } from './dto/create-bapti.dto';
import { UpdateBaptiDto } from './dto/update-bapti.dto';

@Injectable()
export class BaptisService {
  create(createBaptiDto: CreateBaptiDto) {
    return 'This action adds a new bapti';
  }

  findAll() {
    return `This action returns all baptis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bapti`;
  }

  update(id: number, updateBaptiDto: UpdateBaptiDto) {
    return `This action updates a #${id} bapti`;
  }

  remove(id: number) {
    return `This action removes a #${id} bapti`;
  }
}
