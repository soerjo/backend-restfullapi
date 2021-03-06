import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Order } from '../type/order.enum';

export class PageOptionDto {
  @ApiPropertyOptional({ enum: Order, type: Order })
  @IsEnum(Order)
  @IsOptional()
  order?: Order;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  take?: number = 5;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
