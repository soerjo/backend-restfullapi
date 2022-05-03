import { PartialType } from '@nestjs/mapped-types';
import { CreateBaptiDto } from './create-bapti.dto';

export class UpdateBaptiDto extends PartialType(CreateBaptiDto) {}
