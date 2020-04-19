//import { OpenRouteDTO } from './dto/open-route';

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, EntityRepository } from 'typeorm';

import { CreateOrderDTO } from './dto/create-order.dto';
import { Order } from './order.entity';
import { OrderDetail } from './orderDetail.entity';

import { FilterOrderDTO } from './dto/filter-order.dto';
import { ProductRepository } from '../product/product.repository';
import { UpdateResult } from 'typeorm';
import { UserRepository } from '../user/user.repository';
import { StoreRepository } from '../store/store.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(StoreRepository)
    private readonly storeRepository: StoreRepository,
  ) {}

  async getOrders(id_store, user) {
    const store = await this.storeRepository.findOne({ id_store: id_store });
    if (!store) {
      throw new NotFoundException("Nous n'avons pas trouvé ce magasins");
    }

    const orders = await this.orderRepository.find({ store: store });

    return orders;
  }

  async findOrder(filterOrderDTO: FilterOrderDTO, user) {
    return await this.orderRepository.findOrder(filterOrderDTO, user);
  }

  async getOrder(id, user): Promise<{}> {
    return await this.orderRepository.getOrder(id, user);
  }

  async createOrder(createOrderDTO: CreateOrderDTO): Promise<Order> {
    /*   const findUser = await this.userRepository.findOne({
      id_user: user.id_user,
    });

    if (findUser.user_checked === false) {
      throw new UnauthorizedException(
        'You need to verify your identity first then you could post orders',
      );
    }
 */
    const {
      first_name,
      last_name,
      collect_date,
      mail,
      phone_number,
      order_amount,
      products,
      id_store,
    } = createOrderDTO;

    const store = await this.storeRepository.findOne({ id_store: id_store });
    if (!store) {
      throw new NotFoundException("Nous n'avons pas trouvé ce magasins");
    }

    const order = this.orderRepository.create();
    // const products = order.orderDetails;

    /*    const products = [
      {
        price: 10,
        id_product: 'f3ce7082-dd03-4c3e-a9f1-95328a322d2d',
        quantity: 3,
        product_name: 'Papier toillette',
      },
      {
        price: 2,
        id_product: '346ef192-885a-4fab-bef3-61f2f4f9cf90',
        quantity: 2,
        product_name: 'banane',
      },
    ]; */

    order.first_name = first_name;

    order.last_name = last_name;

    order.mail = mail;

    order.phone_number = phone_number;

    order.collect_date = collect_date;

    order.birth_date = '9';
    order.store = store;

    let computed_amount = 0;
    let savedOrder;
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
        computed_amount =
          computed_amount + foundProduct.price * element.quantity;
      } catch (error) {
        console.log(error);
      }
    }

    if (computed_amount !== order_amount) {
      throw new NotFoundException(
        `Probleme with the verification of the computed amount `,
      );
    }

    order.order_amount = computed_amount;

    try {
      savedOrder = await order.save();
      console.log(savedOrder);
    } catch (error) {
      console.log(error);
    }

    for (const element of products) {
      let orderDetail = await this.orderDetailRepository.create();

      let foundProduct = await this.productRepository.findOne({
        id_product: element.id_product,
      });

      /* <fullfil BdD entity>  ******/
      /*    <BDD relation> */
      orderDetail.order = savedOrder;
      orderDetail.id_product = foundProduct.id_product;
      console.log(foundProduct.name);
      //    </BDD relation> */
      //    <Recup de prop Objet>
      orderDetail.product_name = foundProduct.name;
      orderDetail.price = foundProduct.price;
      orderDetail.measure = foundProduct.measure_type;
      //   </Recup de prop Objet>
      // ce que le front nous envoi mais qu'on a pas et qu'on a besoin
      //
      orderDetail.quantity = element.quantity;
      /* </fullfil BdD entity>  ******/
      try {
        await orderDetail.save();
      } catch (error) {
        console.log(error);
      }
    }

    return savedOrder;
  }

  async deleteOrder(id, user): Promise<{}> {
    return await this.orderRepository.deleteOrder(id, user);
  }

  async updateOrder(createOrderDTO: CreateOrderDTO, user, id): Promise<Order> {
    return await this.orderRepository.updateOrder(createOrderDTO, user, id);
  }
}
