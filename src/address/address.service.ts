import { Injectable } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { CreateAddressDTO } from './dto/create-address.dto';
import { Address } from './address.entity';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) { }

  async updateAddress(createAddressDTO: CreateAddressDTO, id, user): Promise<Address> {
    return this.addressRepository.updateAddress(createAddressDTO, id, user);
  }

  async createAddress(createAddressDTO: CreateAddressDTO, user): Promise<Address> {
    return await this.addressRepository.createAddress(createAddressDTO, user);
  }
  async findAddress(id, user): Promise<Address> {
    return await this.addressRepository.findAddress(id, user);

  }

}
