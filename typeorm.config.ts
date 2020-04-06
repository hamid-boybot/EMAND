import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { User } from './src/user/user.entity';
import { Address } from './src/address/address.entity';
import { Product } from './src/product/product.entity';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [User, Address, Product],
  synchronize: dbConfig.synchronize,
  logging: false,
};
