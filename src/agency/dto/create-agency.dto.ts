import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export enum AgencyType {
  physic = 'physic',
  virtual = 'virtual',
}

export class CreateAgencyDTO {
  @ApiProperty({ example: 'virtual-Immo' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Aubervillier, 93300',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: 'description',
  })
  @IsString()
  picture: string;

  @ApiProperty({
    example: 'description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    enum: ['physic', 'virtual'],
    example: 'physic',
  })
  agency_type: AgencyType;

  @ApiProperty({ example: '9h00-20h00' })
  @IsString()
  hour: string;
}
