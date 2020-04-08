import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export enum StoreType {
  boucherie = 'boucherie',
  boulangerie = 'boulangerie',
  pharmacie = 'pharmacie',
  epicerie = 'epicerie',
  fruit = 'fruit',
}

export class FilterStoreDTO {
  @ApiPropertyOptional({
    example: 'Aubervillier',
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiPropertyOptional({ example: 'boucherie' })
  @IsOptional()
  @IsString()
  search: string;

  @ApiPropertyOptional({ example: '20h' })
  @IsOptional()
  @IsString()
  hour: string;

  @ApiPropertyOptional({
    enum: ['boucherie', 'boulangerie', 'pharmacie', 'epicerie'],
    example: 'boulangerie',
  })
  @IsOptional()
  store_type: StoreType;

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
}
