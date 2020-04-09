import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { AddressRepository } from '../address/address.repository';
import { UserRepository } from '../user/user.repository';
import { ProductRepository } from '../product/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository,
      AddressRepository,
      UserRepository,
      ProductRepository,
    ]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
