import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

export enum ProductType {
  fruit = 'fruit',
  légume = 'légume',
  alimentaire = 'alimentaire',
  sanitaire = 'sanitaire',
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
  @Column()
  price: number;
  @Column({ type: 'enum', enum: ProductType })
  product_type: string;
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(
    () => User,
    user => user.products,
  )
  user: User;
}
