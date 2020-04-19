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
import { OrderDetail } from './orderDetail.entity';
import { Store } from '../store/store.entity';
export enum OrderType {
  fruit = 'fruit',
  legume = 'légume',
  alimentaire = 'alimentaire',
  sanitaire = 'sanitaire',
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_order: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  birth_date: string;

  @Column()
  mail: string;

  @Column()
  phone_number: string;

  @Column()
  order_amount: number;

  @Column()
  collect_date: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.orders, {
    cascade: true,
  })
  user: User;

  @ManyToOne(() => Store, store => store.orders, {
    cascade: true,
  })
  store: Store;

  @OneToMany(() => OrderDetail, orderDetails => orderDetails.order)
  orderDetails: OrderDetail[];
}
