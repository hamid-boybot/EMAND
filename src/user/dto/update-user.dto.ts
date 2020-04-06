import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({ example: 'So' })
  @IsString()
  first_name: string;
  @ApiProperty({ example: 'Henocq' })
  @IsString()
  last_name: string;
  @ApiProperty({ example: 30 })
  @IsNumber()
  age: number;
  @ApiProperty({ example: 'https://imgUrl.com' })
  @IsString()
  imgUrl: string;
  @ApiProperty({ example: 'F', enum: ['M', 'F', 'Other'] })
  sexe: UserSexe;
  @ApiProperty({ example: 'je ne suis pas un grand joueur de jeux video' })
  about: string;
}

export enum UserSexe {
  M = 'M',
  F = 'F',
  Other = 'Other',
}
