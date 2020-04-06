import { ProductService } from './product.service';
import { Test } from '@nestjs/testing';
import { FilterProductDTO } from './dto/filter-product.dto';
import { ProductType } from './product.entity';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { AddressRepository } from '../address/address.repository';
import { UserRepository } from '../user/user.repository';

// const mockProductRepository = () => ({
//   findProduct: jest.fn(),
// });
// const mockAddressRepository = () => ({});

// describe('Product Service', () => {
//   let productRepository: ProductRepository;
//   let productService: ProductService;
//   let addressRepository: AddressRepository;
//   let userRepository: UserRepository;

//   beforeEach(async () => {
//     const module = await Test.createTestingModule({
//       providers: [
//         ProductService,
//         { provide: ProductRepository, useFactory: mockProductRepository },
//         { provide: AddressRepository, useFactory: mockAddressRepository },
//         { provide: UserRepository, useFactory: mockAddressRepository },
//       ],
//     }).compile();

//     productService = await module.get<ProductService>(ProductService);
//     productRepository = await module.get<ProductRepository>(ProductRepository);
//     addressRepository = await module.get<AddressRepository>(AddressRepository);
//   });

//   describe('find product', () => {
//     it('should test if findEven is called', async () => {
//       const filterProductDTO: FilterProductDTO = {
//         id: '',
//         search: '',
//         product_date: new Date('2019-11-23 11:56:18.459'),
//         product_type: ProductType.jeuxVideo,
//         take: 10,
//         skip: 0,
//       };

//       jest
//         .spyOn(productService, 'findProduct')
//         .mockImplementation(async () => await [[new Product()], 1]);

//       expect(await productService.findProduct(filterProductDTO)).toStrictEqual([
//         [new Product()],
//         1,
//       ]);

//       expect(productService.findProduct).toHaveBeenCalled();
//     });
//   });
// });
