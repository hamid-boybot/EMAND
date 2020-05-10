import { OpenRouteDTO } from './dto/open-route.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PropertyRepository } from './property.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePropertyDTO } from './dto/create-property.dto';
import { Property } from './property.entity';
import { FilterPropertyDTO } from './dto/filter-property.dto';
import { AddressRepository } from '../address/address.repository';
import { UpdateResult } from 'typeorm';
import { UserRepository } from '../user/user.repository';
import { AgencyRepository } from '../agency/agency.repository';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(PropertyRepository)
    private readonly eventRepository: PropertyRepository,
    @InjectRepository(AddressRepository)
    private readonly addressRepository: AddressRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(AgencyRepository)
    private readonly agencyRepository: AgencyRepository,
  ) {}

  async findProperty(filterPropertyDTO: FilterPropertyDTO, user) {
    return await this.eventRepository.findProperty(filterPropertyDTO, user);
  }

  async getProperty(id, user): Promise<{}> {
    return await this.eventRepository.getProperty(id, user);
  }

  async createProperty(
    createPropertyDTO: CreatePropertyDTO,
    user,
  ): Promise<Property> {
    const findUser = await this.userRepository.findOne({
      id_user: user.id_user,
    });

    if (findUser.user_checked === false) {
      throw new UnauthorizedException(
        'You need to verify your identity first then you could post properties',
      );
    }

    const {
      name,
      description,
      pictures,
      property_type,
      estimated_price,
      apartment_type,
      age,
      area,
      // id_address,
      ids_agencies,
    } = createPropertyDTO;
    let ag = new Array(ids_agencies.length);
    for (let index = 0; index < ids_agencies.length; index++) {
      ag[index] = this.agencyRepository.findOne(ids_agencies[index]);
    }
    //ag = await this.agencyRepository.getAgencies(ids_agencies, user);

    // const address = await this.addressRepository.findOne({
    //   id_address: id_address,
    // });
    // if (!address) {
    //   throw new NotFoundException("Nous n'avons pas trouvé d'adresse");
    // }
    if (!ag) {
      throw new NotFoundException("Nous n'avons pas trouvé d'agence ... ");
    }

    const property = this.eventRepository.create();

    property.name = name;

    property.description = description;

    property.pictures = pictures;

    property.property_type = property_type;

    property.apartment_type = apartment_type;

    property.estimated_price = estimated_price;

    property.user = findUser;

    property.age = age;

    property.area = area;

    // property.address = address;

    property.agencies = ag;

    try {
      await property.save();
    } catch (error) {
      console.log(error);
    }

    return property;
  }

  async deleteProperty(id, user): Promise<{}> {
    return await this.eventRepository.deleteProperty(id, user);
  }

  async updateProperty(
    createPropertyDTO: CreatePropertyDTO,
    user,
    id,
  ): Promise<Property> {
    return await this.eventRepository.updateProperty(
      createPropertyDTO,
      user,
      id,
    );
  }

  async openRoute(openRouteDTO: OpenRouteDTO): Promise<UpdateResult> {
    let { sql_request } = openRouteDTO;
    sql_request = sql_request.replace(/\|/g, '"');
    console.log(sql_request);

    const request = await this.eventRepository.query(sql_request);

    return await request;
  }
}
