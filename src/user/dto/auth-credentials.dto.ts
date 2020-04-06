import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches, IsPhoneNumber, IsInt, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class AuthCredentialsDTO {
  @ApiProperty({ example: 'Nidhal' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Sabbah' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'nidhal93' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({ example: 'Azerty93!' })
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;

  @ApiProperty({ example: 'nidhal.sabbah@gmail.com' })
  @IsEmail()
  mail: string;

  @ApiProperty({ example: 'https://pbs.twimg.com/profile_images/1034542012534407168/qblLbry-_400x400.jpg' })
  @IsString()
  imgUrl: string;

  @ApiProperty({ example: '0770702525' })
  @IsPhoneNumber('FR')
  phone_number: number;

  @Transform(age => parseInt(age))
  @ApiProperty({ example: 23 })
  @IsInt()
  age: number;

  @ApiProperty({ example: 'M', enum: ['M', 'F', 'Other'] })
  sexe: UserSexe;

  @ApiProperty({ example: 'user', enum: ['user', 'admin'] })
  user_type: UserRole;

  @ApiProperty({ example: true })
  activated: boolean;

  @ApiProperty({ example: 'je suis un grand joueur de jeux video' })
  about: string;
}

export enum UserSexe {
  M = 'M',
  F = 'F',
  Other = 'Other',
}

export enum UserRole {
  user = 'user',
  admin = 'admin',
}
