import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export enum AgencyType {
  physic = 'physic',
  virtual = 'virtual',
}

export class FilterAgencyDTO {
  @ApiPropertyOptional({
    example: '7 boulevard kennedy 75016',
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiPropertyOptional({ example: '16ème arrondissement' })
  @IsOptional()
  @IsString()
  search: string;

  @ApiPropertyOptional({ example: '9h-20h' })
  @IsOptional()
  @IsString()
  hour: string;

  @ApiPropertyOptional({
    enum: ['physic', 'virtual'],
    example: 'virtual',
  })
  @IsOptional()
  agency_type: AgencyType;

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
