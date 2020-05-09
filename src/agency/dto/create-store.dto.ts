import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export enum StoreType {
  boucherie = 'boucherie',
  boulangerie = 'boulangerie',
  pharmacie = 'pharmacie',
  epicerie = 'epicerie',
  fruit = 'fruit',
}

export class CreateStoreDTO {
  @ApiProperty({ example: 'Boulangerie' })
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
    enum: ['fruit', 'légume', 'alimentaire', 'sanitaire'],
    example: 'boulangerie',
  })
  store_type: StoreType;

  @ApiProperty({ example: '9h00-20h00' })
  @IsString()
  hour: string;
}
