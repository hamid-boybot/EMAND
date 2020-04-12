import { Delete } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

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
    example: '[]',
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
  @IsString()
  order_date: string;

  @ApiProperty({
    example: 20,
  })
  order_amount: number;
}
/*
export enum OrderType {
  fruit = 'fruit',
  legume = 'légume',
  alimentaire = 'alimentaire',
  sanitaire = 'sanitaire',
} */
