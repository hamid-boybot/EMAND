import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

import { Agency } from '../agency/agency.entity';
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
  @Column('simple-array')
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
  age: number;
  @Column()
  area: number;
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.properties)
  user: User;

  @ManyToMany(() => Agency, agencies => agencies.properties, { eager: true })
  @JoinTable()
  agencies: Agency[];

  @OneToOne(() => Address, address => address.property, { eager: true })
  @JoinColumn()
  address: Address;
}
