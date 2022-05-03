import { Type, Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '../../common/type/gender.enum';
import { Role } from 'src/common/type';

export class CreateJemaatDto {
  @ApiProperty()
  @IsString()
  @Transform((val) => val.value.toLowerCase())
  @IsNotEmpty()
  nama_lengkap: string;

  @ApiProperty({ enum: Gender, type: Gender })
  @IsEnum(Gender)
  @IsNotEmpty()
  jenis_kelamin: Gender;

  @ApiPropertyOptional()
  @IsEmail()
  @Transform((val) => val.value?.toLowerCase())
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @Transform((val) => val.value.toLowerCase())
  @IsNotEmpty()
  nama_panggilan?: string;

  @ApiPropertyOptional()
  @IsString()
  @Transform((val) => val.value.toLowerCase())
  @IsOptional()
  tempat_lahir?: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  tanggal_lahir: Date;

  @ApiPropertyOptional()
  @IsString()
  @Transform((val) => val.value.toLowerCase())
  @IsOptional()
  alamat?: string;

  @ApiPropertyOptional()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  tanggal_lahir_baru?: Date;

  @ApiPropertyOptional({ enum: Role, type: Role })
  @IsEnum(Role)
  @IsOptional()
  role?: Role = Role.JEMAAT;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  blesscomn?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  wilayah_pelayanan?: string;
}
