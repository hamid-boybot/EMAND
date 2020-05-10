import { Delete } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
//import { IsString } from 'util';

const address = {
  name: 'mon adresse',
  street: '7 allee Henri Matisse',
  city: 'Aubervilliers',
  state: 'Saint-Denis',
  country: 'France',
  zip_code: 93300,
};
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
export class CreatePropertyDTO {
  @ApiProperty({ example: 'La templerie' })
  @IsString()
  name: string;

  @ApiProperty({
    example: [
      'https://static.actu.fr/uploads/2019/07/AdobeStock_90990567-854x568.jpeg',
      'https://static.actu.fr/uploads/2019/07/AdobeStock_90990567-854x568.jpeg',
      'https://static.actu.fr/uploads/2019/07/AdobeStock_90990567-854x568.jpeg',
    ],
  })
  @IsArray()
  pictures: string[];

  @ApiProperty({
    example:
      'Homines enim eruditos et sobrios ut infaustos et inutiles vitant, eo quoque accedente quod et nomenclatores adsueti haec et talia venditare, mercede accepta lucris quosdam et prandiis inserunt subditicios ignobiles et obscuros. At nunc si ad aliquem bene nummatum tumentemque ideo honestus advena salutatum introieris, primitus tamquam exoptatus suscipieris et interrogatus multa coactusque mentiri, miraberis numquam antea visus summatem virum tenuem te sic enixius observantem, ut paeniteat ob haec bona tamquam praecipua non vidisse ante decennium Romam.Victus universis caro ferina est lactisque abundans copia qua sustentantur, et herbae multiplices et siquae alites capi per aucupium possint, et plerosque mos vidimus frumenti usum et vini penitus ignorantes.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    enum: ['apartment', 'parking', 'garage', 'warehouse', 'cellar'],
    example: 'apartment',
  })
  property_type: PropertyType;

  @ApiProperty({
    enum: ['T1', 'T2', 'T3', 'T4'],
    example: 'T2',
  })
  apartment_type: ApartmentType;

  @ApiProperty({ example: 100000 })
  @Transform(estimated_price => parseInt(estimated_price))
  @IsNumber()
  @Min(0)
  estimated_price: number;

  @ApiProperty({ example: 100 })
  @Transform(area => parseInt(area))
  @IsNumber()
  @Min(0)
  area: number;

  @ApiProperty({ example: 10 })
  @Transform(age => parseInt(age))
  @IsNumber()
  @Min(0)
  age: number;

  @ApiProperty({ example: address })
  address: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip_code: number;
    lat: number;
    lng: number;
  };

  @ApiProperty({
    example: 'id_address',
  })
  @IsString()
  id_address: string;

  @ApiProperty({
    example: ['id_agency1', 'id_agency2', 'id_agency3'],
  })
  @IsArray()
  ids_agencies: string[];
}
