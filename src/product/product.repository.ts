import { Repository, EntityRepository } from 'typeorm';
import { Product, MeasureType } from './product.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { FilterProductDTO, SortType } from './dto/filter-product.dto';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { OrderType } from 'src/order/orderDetail.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findProduct(filterProductDTO: FilterProductDTO, user) {
    let { search, product_type, take, skip, sort, price } = filterProductDTO;
    take = take || 10;
    skip = skip || 0;

    const query = this.createQueryBuilder('product');

    if (product_type) {
      query.andWhere('product.product_type=:product_type', { product_type });
    }

    if (price) {
      query.andWhere('product.price <= :price', { price });
    }

    if (search) {
      query.andWhere(
        'product.name ILIKE :search OR product.description ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (sort === SortType.price) {
      query.orderBy({ 'product.price': 'ASC' });
    }

    if (sort === SortType.measure_type) {
      query.orderBy({ 'product.measure_type': 'ASC' });
    }

    const products: any = await query
      .take(take)
      .skip(skip)
      .getManyAndCount();

    return products;
  }

  async getProduct(id, user): Promise<{}> {
    let findProduct;

    try {
      const query = await this.createQueryBuilder('product').where(
        'product.id_product=:id',
        { id },
      );

      findProduct = await query.getOne();
    } catch (error) {
      console.log(error);
      throw new NotFoundException('not found ');
    }

    return findProduct;
  }

  async deleteProduct(id, user): Promise<{}> {
    const findProduct = await this.findOne({ id_product: id });

    if (!findProduct) {
      throw new NotFoundException('Product not found');
    }

    const findUser = await this.findOne({ id_product: id, user: user.id_user });

    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to delete this product',
      );
    }

    const result = await this.createQueryBuilder()
      .delete()
      .from(Product)
      .where('id_product = :id', { id: id })
      // .andWhere('user = :id', { id: user.id_user })
      .execute();

    return result;
  }

  async updateProduct(
    createProductDto: CreateProductDTO,
    user,
    id,
  ): Promise<Product> {
    const {
      name,
      description,
      picture,
      product_type,
      price,
      measure_type,
    } = createProductDto;

    const findProduct = await this.findOne({ id_product: id });

    if (!findProduct) {
      throw new NotFoundException('Product not found');
    }

    console.log(user);
    const findUser = await this.findOne({ id_product: id, user: user.id_user });

    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to update this product',
      );
    }

    await this.createQueryBuilder()
      .update(Product)
      .set({
        name: name,
        description: description,
        picture: picture,
        product_type: product_type,
        price: price,
        user: user,
        measure_type: measure_type,
      })
      .where({ id_product: id })
      .execute();

    return await this.findOne({ id_product: id });
  }
}
