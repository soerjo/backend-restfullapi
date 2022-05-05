import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class RecoverPasswordDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
