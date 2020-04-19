import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { isNull } from 'util';
import {
  IsBoolean,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
  IsDate,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum OrderType {
  fruit = 'fruit',
  legume = 'légume',
  alimentaire = 'alimentaire',
  sanitaire = 'sanitaire',
}

export enum OrderSortType {
  name = 'name',
  order_amount = 'order_amount',
  order_creationDate = 'order_creationDate',
}

export class FilterOrderDTO {
  @ApiPropertyOptional({ example: 'tomate' })
  @IsString()
  @IsOptional()
  search: string;

  @ApiPropertyOptional({ example: 'sanitaire', enum: Object.keys(OrderType) })
  order_type: OrderType;

  @ApiPropertyOptional({ example: 10 })
  @Transform(take => parseInt(take))
  @IsNumber()
  @IsOptional()
  take: number;

  @ApiPropertyOptional({ example: 5 })
  @Transform(skip => parseInt(skip))
  @IsNumber()
  @IsOptional()
  skip: number;

  @ApiPropertyOptional({ example: 10 })
  @Transform(order_amount => parseInt(order_amount))
  @IsNumber()
  @IsOptional()
  order_amount: number;

  @ApiPropertyOptional({ example: 11 / 3 / 2020 })
  @Transform(created_at => parseInt(created_at))
  @IsDate()
  @IsOptional()
  created_at: Date;

  @ApiPropertyOptional({ example: 'price', enum: Object.keys(OrderSortType) })
  @IsOptional()
  orderSortType: OrderSortType;
}
