import { Delete } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { isString } from 'util';

export class CreateProductDTO {
  @ApiProperty({ example: 'Papier toillette' })
  @IsString()
  name: string;

  @ApiProperty({
    example:
      'https://static.actu.fr/uploads/2019/07/AdobeStock_90990567-854x568.jpeg',
  })
  @IsString()
  picture: string;

  @ApiProperty({
    example:
      'Homines enim eruditos et sobrios ut infaustos et inutiles vitant, eo quoque accedente quod et nomenclatores adsueti haec et talia venditare, mercede accepta lucris quosdam et prandiis inserunt subditicios ignobiles et obscuros. At nunc si ad aliquem bene nummatum tumentemque ideo honestus advena salutatum introieris, primitus tamquam exoptatus suscipieris et interrogatus multa coactusque mentiri, miraberis numquam antea visus summatem virum tenuem te sic enixius observantem, ut paeniteat ob haec bona tamquam praecipua non vidisse ante decennium Romam.Victus universis caro ferina est lactisque abundans copia qua sustentantur, et herbae multiplices et siquae alites capi per aucupium possint, et plerosque mos vidimus frumenti usum et vini penitus ignorantes.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    enum: ['piece', 'kg', 'g', 'm2'],
    example: 'piece',
  })
  measure_type: MeasureType;

  @ApiProperty({
    enum: ['fruit', 'légume', 'alimentaire', 'sanitaire'],
    example: 'sanitaire',
  })
  product_type: ProductType;

  @ApiProperty({ example: 10 })
  @Transform(price => parseInt(price))
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 'id_store',
  })
  @IsString()
  id_store: string;
}

export enum MeasureType {
  piece = 'piece',
  kg = 'kg',
  grammes = 'g',
  surface = 'm2',
}

export enum ProductType {
  fruit = 'fruit',
  légume = 'légume',
  alimentaire = 'alimentaire',
  sanitaire = 'sanitaire',
}
