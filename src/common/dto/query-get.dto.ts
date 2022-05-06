import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { PageOptionDto } from 'src/common/dto';

export class SearchQueryDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  orderBy?: string = 'createdAt';

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(20)
  @IsOptional()
  word?: string;
}

export class QueryGetDto extends IntersectionType(
  SearchQueryDto,
  PageOptionDto,
) {}
