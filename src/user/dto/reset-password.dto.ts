import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength, Matches } from 'class-validator';

export class ResetPasswordDTO {
  @ApiProperty({ example: 'Azerty93!' })
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;
}
