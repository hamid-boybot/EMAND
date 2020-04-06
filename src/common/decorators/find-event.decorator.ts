import { ValidatorConstraint, ValidationArguments } from 'class-validator';
import { ProductRepository } from '../../product/product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'FindProduct', async: true })
@Injectable()
export class FindProduct {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async validate(value: any, args: ValidationArguments) {
    console.log(typeof value + ' ' + JSON.stringify(args));
    const found = await this.productRepository.find();
    if (found) return true;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'User with this email already exists.';
  }
}
