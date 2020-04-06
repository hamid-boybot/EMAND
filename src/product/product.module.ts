import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { AddressRepository } from '../address/address.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductRepository,
      AddressRepository,
      UserRepository,
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
