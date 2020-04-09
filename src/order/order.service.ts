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
import { ProductRepository } from '../product/product.repository';
import { UpdateResult } from 'typeorm';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly eventRepository: OrderRepository,
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
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

    const {
      frist_name,
      last_name,
      order_date,
      mail,
      phone_number,
      order_amount,
    } = createOrderDTO;

    const order = this.eventRepository.create();

    const products = [
      {
        price: 'number',
        id_product: '938a415d-d23f-4bbb-90ce-37fff5d17201',
        quantity: 'number',
        product_name: 'string',
      },
      {
        price: 'number',
        id_product: '16e88bf7-ee5b-4a30-be5a-241310429345',
        quantity: 'number',
        product_name: 'string',
      },
      {
        price: 'number',
        id_product: '16e88bf7-ee5b-4a30-be5a-24131042934d',
        quantity: 'number',
        product_name: 'string',
      },
    ];

    order.first_name = frist_name;

    order.last_name = last_name;

    order.mail = mail;

    order.phone_number = phone_number;

    order.order_date = order_date;

    order.order_amount = order_amount;

    order.birth_date = '9';

    let computed_amount = 0;

    for (const element of products) {
      let foundProduct;
      try {
        foundProduct = await this.productRepository.findOne({
          id_product: element.id_product,
        });

        if (!foundProduct) {
          throw new NotFoundException(
            `Produit ${element.product_name} not found`,
          );
        }
        computed_amount += foundProduct.price;
      } catch (error) {
        console.log(error);
      }
    }

    console.log('somme=' + computed_amount);

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
