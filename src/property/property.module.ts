import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyRepository } from './property.repository';
import { AddressRepository } from '../address/address.repository';
import { UserRepository } from '../user/user.repository';
import { AgencyRepository } from '../agency/agency.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PropertyRepository,
      AddressRepository,
      UserRepository,
      AgencyRepository,
    ]),
  ],
  providers: [PropertyService],
  controllers: [PropertyController],
})
export class PropertyModule {}
