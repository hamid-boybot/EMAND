import { IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export enum ProfileType {
  public = 'public',
  organizer = 'organizer',
}

export class UserInformationDTO {
  @ApiPropertyOptional({ enum: Object.keys(ProfileType) })
  @IsOptional()
  profile_type: ProfileType;

  @ApiPropertyOptional({ example: 'uiuid' })
  @IsOptional()
  profile_id: string;
}
