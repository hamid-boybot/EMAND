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

export enum PropertyType {
  apartment = 'apartment',
  parking = 'parking',
  garage = 'garage',
  warehouse = 'warehouse',
  cellar = 'cellar',
}

export enum ApartmentType {
  t1 = 'T1',
  t2 = 'T2',
  t3 = 'T3',
  t4 = 'T4',
  t5 = 'T5',
}

export enum SortType {
  estimated_price = 'estimated_price',
  area = 'area',
  city = 'city',
}

export class FilterPropertyDTO {
  @ApiPropertyOptional({ example: 'La templerie' })
  @IsString()
  @IsOptional()
  search: string;

  @ApiPropertyOptional({
    example: 'apartment',
    enum: Object.keys(PropertyType),
  })
  propertyt_type: PropertyType;

  @ApiPropertyOptional({ example: 10 })
  @Transform(take => parseInt(take))
  @IsNumber()
  @IsOptional()
  take: number;

  @ApiPropertyOptional({ example: 0 })
  @Transform(skip => parseInt(skip))
  @IsNumber()
  @IsOptional()
  skip: number;

  @ApiPropertyOptional({ example: 100000 })
  @Transform(estimated_price => parseInt(estimated_price))
  @IsNumber()
  @IsOptional()
  estimated_price: number;

  @ApiPropertyOptional({ example: 25 })
  @Transform(area => parseInt(area))
  @IsNumber()
  @IsOptional()
  area: number;

  @ApiPropertyOptional({
    enum: ['apartment', 'parking', 'garage', 'warehouse', 'cellar'],
    example: 'apartment',
  })
  @IsOptional()
  property_type: PropertyType;

  @ApiPropertyOptional({ example: '20eme arrondissement Dto' })
  @IsString()
  @IsOptional()
  city: string;

  @ApiPropertyOptional({
    example: 'estimated_price',
    enum: Object.keys(SortType),
  })
  @IsOptional()
  sort: SortType;
}
