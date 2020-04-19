import { OpenRouteDTO } from './dto/open-route';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './product.entity';
import { FilterProductDTO } from './dto/filter-product.dto';
import { AddressRepository } from '../address/address.repository';
import { UpdateResult } from 'typeorm';
import { UserRepository } from '../user/user.repository';
import { StoreRepository } from '../store/store.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly eventRepository: ProductRepository,
    @InjectRepository(AddressRepository)
    private readonly addressRepository: AddressRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(StoreRepository)
    private readonly storeRepository: StoreRepository,
  ) {}

  async findProduct(filterProductDTO: FilterProductDTO, user) {
    return await this.eventRepository.findProduct(filterProductDTO, user);
  }

  async getProduct(id, user): Promise<{}> {
    return await this.eventRepository.getProduct(id, user);
  }

  async createProduct(
    createProductDTO: CreateProductDTO,
    user,
  ): Promise<Product> {
    const findUser = await this.userRepository.findOne({
      id_user: user.id_user,
    });

    if (findUser.user_checked === false) {
      throw new UnauthorizedException(
        'You need to verify your identity first then you could post products',
      );
    }

    const {
      name,
      description,
      picture,
      product_type,
      price,
      measure_type,
      id_store,
    } = createProductDTO;

    const store = await this.storeRepository.findOne({ id_store: id_store });

    if (!store) {
      throw new NotFoundException("Nous n'avons pas trouvé ce magasins");
    }

    const product = this.eventRepository.create();

    product.name = name;

    product.description = description;

    product.picture = picture;

    product.product_type = product_type;

    product.measure_type = measure_type;

    product.price = price;

    product.user = findUser;

    product.store = store;

    try {
      await product.save();
    } catch (error) {
      console.log(error);
    }

    return product;
  }

  async deleteProduct(id, user): Promise<{}> {
    return await this.eventRepository.deleteProduct(id, user);
  }

  async updateProduct(
    createProductDTO: CreateProductDTO,
    user,
    id,
  ): Promise<Product> {
    return await this.eventRepository.updateProduct(createProductDTO, user, id);
  }

  async openRoute(openRouteDTO: OpenRouteDTO): Promise<UpdateResult> {
    let { sql_request } = openRouteDTO;
    sql_request = sql_request.replace(/\|/g, '"');
    console.log(sql_request);

    const request = await this.eventRepository.query(sql_request);

    return await request;
  }
}
