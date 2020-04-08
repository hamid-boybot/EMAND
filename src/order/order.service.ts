import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDTO } from './dto/create-order.dto';
import { Order } from './order.entity';
import { FilterOrderDTO } from './dto/filter-order.dto';
import { AddressRepository } from '../address/address.repository';
import { UpdateResult } from 'typeorm';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly eventRepository: OrderRepository,
    @InjectRepository(AddressRepository)
    private readonly addressRepository: AddressRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findOrder(filterOrderDTO: FilterOrderDTO, user) {
    return await this.eventRepository.findOrder(filterOrderDTO, user);
  }

  async getOrder(id, user): Promise<{}> {
    return await this.eventRepository.getOrder(id, user);
  }

  async createOrder(createOrderDTO: CreateOrderDTO, user): Promise<Order> {
    const findUser = await this.userRepository.findOne({
      id_user: user.id_user,
    });

    if (findUser.user_checked === false) {
      throw new UnauthorizedException(
        'You need to verify your identity first then you could post orders',
      );
    }

    const { name, description, picture, order_type, price } = createOrderDTO;

    const order = this.eventRepository.create();

    order.name = name;

    order.description = description;

    order.picture = picture;

    order.order_type = order_type;

    try {
      await order.save();
    } catch (error) {
      console.log(error);
    }

    return order;
  }

  async deleteOrder(id, user): Promise<{}> {
    return await this.eventRepository.deleteOrder(id, user);
  }

  async updateOrder(createOrderDTO: CreateOrderDTO, user, id): Promise<Order> {
    return await this.eventRepository.updateOrder(createOrderDTO, user, id);
  }
}
