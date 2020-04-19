import { Delete } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

const products = [
  {
    price: 10,
    id_product: 'f3ce7082-dd03-4c3e-a9f1-95328a322d2d',
    quantity: 3,
    product_name: 'Papier toillette',
  },
  {
    price: 2,
    id_product: '346ef192-885a-4fab-bef3-61f2f4f9cf90',
    quantity: 2,
    product_name: 'banane',
  },
];

export class CreateOrderDTO {
  @ApiProperty({ example: 'Hamid' })
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Bassam',
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    example: 'hamid-bassam@gmail.com',
  })
  @IsString()
  mail: string;

  @ApiProperty({
    example: '0770702525',
  })
  @IsString()
  phone_number: string;

  @ApiProperty({
    example: products,
  })
  products: [
    {
      price: number;
      id_product: string;
      quantity: number;
      product_name: string;
    }
  ];

  @ApiProperty({
    example: '18-h',
  })
  collect_date: string;

  @ApiProperty({
    example: 20,
  })
  @IsNumber()
  order_amount: number;

  @ApiProperty({
    example: '7d1c8b38-b817-4fda-b34a-ea809a355b27',
  })
  @IsString()
  id_store: string;
}
/*
export enum OrderType {
  fruit = 'fruit',
  legume = 'légume',
  alimentaire = 'alimentaire',
  sanitaire = 'sanitaire',
} */
