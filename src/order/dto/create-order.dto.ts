import { Delete } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateOrderDTO {
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
    enum: ['fruit', 'lÃ©gume', 'alimentaire', 'sanitaire'],
    example: 'sanitaire',
  })
  order_type: OrderType;

  @ApiProperty({ example: 10 })
  @Transform(price => parseInt(price))
  @IsNumber()
  @Min(0)
  price: number;
}

export enum OrderType {
  fruit = 'fruit',
  legume = 'légume',
  alimentaire = 'alimentaire',
  sanitaire = 'sanitaire',
}
