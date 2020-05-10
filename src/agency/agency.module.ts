import { Module } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyRepository } from '../property/property.repository';
import { AgencyRepository } from '../agency/agency.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PropertyRepository,
      AgencyRepository,
      UserRepository,
    ]),
  ],
  providers: [AgencyService],
  controllers: [AgencyController],
})
export class AgencyModule {}
