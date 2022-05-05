import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Role } from 'src/common/type';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @ApiPropertyOptional({
    description: 'List of enums',
    isArray: true,
    enum: Role,
  })
  @IsEnum(Role, { each: true })
  role?: Role[];
}
