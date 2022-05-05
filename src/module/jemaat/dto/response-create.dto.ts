import { Exclude } from 'class-transformer';
import { Jemaat } from '../entities/jemaat.entity';

export class ResponseCreateDto extends Jemaat {
  @Exclude()
  updatedAt: Date;

  @Exclude()
  createdAt: Date;

  constructor(obj: Jemaat) {
    super();
    Object.assign(this, obj);
  }
}
