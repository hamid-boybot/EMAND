import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { Order } from '../order/order.entity';

export enum StoreType {
  boucherie = 'boucherie',
  boulangerie = 'boulangerie',
  pharmacie = 'pharmacie',
  epicerie = 'epicerie',
  fruit = 'fruit',
}

@Entity()
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_store: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  picture: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  rating: number;

  @Column()
  hour: string;

  @Column({ type: 'enum', enum: StoreType })
  store_type: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.products)
  user: User;

  @OneToMany(() => Product, product => product.store)
  products: Product[];

  @OneToMany(() => Order, orders => orders.store)
  orders: Order[];
}
