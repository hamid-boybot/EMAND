import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { isNull } from 'util';
import {
  IsBoolean,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum ProductType {
  fruit = 'fruit',
  légume = 'légume',
  alimentaire = 'alimentaire',
  sanitaire = 'sanitaire',
}

export enum Order {
  name = 'name',
  price = 'price',
}

export class FilterProductDTO {
  @ApiPropertyOptional({ example: 'tomate' })
  @IsString()
  @IsOptional()
  search: string;

  @ApiPropertyOptional({ example: 'sanitaire', enum: Object.keys(ProductType) })
  product_type: ProductType;

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
  @Transform(price => parseInt(price))
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiPropertyOptional({ example: 'price', enum: Object.keys(Order) })
  @IsOptional()
  order: Order;
}
