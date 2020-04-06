import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from '../product/product.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, ProductRepository])],
  providers: [],
  controllers: [],
})
export class ParticipantModule {}
