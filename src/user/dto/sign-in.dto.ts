import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
  @ApiProperty({ example: 'nidhal93' })
  username: string;

  @ApiProperty({ example: 'Azerty93!' })
  password: string;
}
