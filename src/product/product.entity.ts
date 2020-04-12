import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

import { Store } from '../store/store.entity';
import { OrderDetail } from 'src/order/orderDetail.entity';

export enum ProductType {
  fruit = 'fruit',
  légume = 'légume',
  alimentaire = 'alimentaire',
  sanitaire = 'sanitaire',
}

export enum MeasureType {
  piece = 'piece',
  kg = 'kg',
  grammes = 'g',
  surface = 'm2',
}

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_product: string;
  @Column()
  name: string;
  @Column()
  picture: string;
  @Column()
  description: string;
  @Column({ type: 'enum', enum: MeasureType })
  measure_type: string;
  @Column()
  price: number;
  @Column({ type: 'enum', enum: ProductType })
  product_type: string;
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.products)
  user: User;

  @ManyToOne(() => Store, store => store.products)
  store: Store;
}
