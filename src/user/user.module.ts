import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyRepository } from '../property/property.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, PropertyRepository])],
  providers: [],
  controllers: [],
})
export class ParticipantModule {}
