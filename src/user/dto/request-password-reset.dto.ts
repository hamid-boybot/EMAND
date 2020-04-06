import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestPasswordResetDTO {
  @ApiProperty({ example: 'nidhal.sabbah@gmail.com' })
  @IsEmail()
  mail: string;
}
