import { PartialType } from '@nestjs/mapped-types';
import { CreateMuridDto } from './create-murid.dto';

export class UpdateMuridDto extends PartialType(CreateMuridDto) {}
