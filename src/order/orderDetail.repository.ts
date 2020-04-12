import { Repository, EntityRepository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDTO } from './dto/create-order.dto';
import { FilterOrderDTO } from './dto/filter-order.dto';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {}
