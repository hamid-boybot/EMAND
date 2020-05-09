import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from '../product/product.repository';
import { StoreRepository } from '../store/store.repository';
import { UserRepository } from '../user/user.repository';
import { OrderRepository } from '../order/order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductRepository,
      StoreRepository,
      UserRepository,
      OrderRepository,
    ]),
  ],
  providers: [StoreService],
  controllers: [StoreController],
})
export class StoreModule {}
