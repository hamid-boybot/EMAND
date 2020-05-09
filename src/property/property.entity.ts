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

import { Agency } from '../store/store.entity';
import { Address } from '../address/address.entity';

export enum PropertyType {
  apartment = 'apartment',
  parking = 'parking',
  garage = 'garage',
  warehouse = 'warehouse',
  cellar = 'cellar',
}

export enum ApartmentType {
  t1 = 'T1',
  t2 = 'T2',
  t3 = 'T3',
  t4 = 'T4',
  t5 = 'T5',
}

@Entity()
export class Property extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_property: string;
  @Column()
  name: string;
  @Column()
  pictures: string[];
  @Column()
  description: string;
  @Column({ type: 'enum', enum: PropertyType })
  property_type: string;
  @Column()
  estimated_price: number;
  @Column({ type: 'enum', enum: ApartmentType })
  apartment_type: string;
  @Column()
  age: string;
  @Column()
  area: number;
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.properties)
  user: User;

  @ManyToOne(() => Agency, agency => agency.properties)
  store: Agency;

  @OneToOne(() => Address, address => address.property)
  address: Address;
}
