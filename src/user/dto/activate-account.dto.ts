import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ActivateAccountDTO {
  @ApiProperty({ example: 99999 })
  @Transform(activation_code => parseInt(activation_code))
  activation_code: number;

  @ApiProperty({ example: 99999 })
  username: string;
}
