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
    const property = this.eventRepository.create();
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
      agencies,
    } = createPropertyDTO;
    const listAgencies = [];
    for (const element of agencies) {
      let foundAgency;
      try {
        foundAgency = await this.agencyRepository.findOne({
          id_agency: element.id_agency,
        });

        if (!foundAgency) {
          throw new NotFoundException(`Agency ${element.id_agency} not found`);
        }
        listAgencies.push(foundAgency);
        // property.id_agency = foundAgency.id_agency;
        // property.agency_name = foundAgency.name;
        // property.agency_adress = foundAgency.address;
        // property.agency_type = foundAgency.agency_type;
      } catch (error) {
        console.log(error);
      }
    }
    console.log(agencies);
    //ag = await this.agencyRepository.getAgencies(ids_agencies, user);

    // const address = await this.addressRepository.findOne({
    //   id_address: id_address,
    // });
    // if (!address) {
    //   throw new NotFoundException("Nous n'avons pas trouvé d'adresse");
    // }

    property.name = name;

    property.description = description;

    property.pictures = pictures;

    property.property_type = property_type;

    property.apartment_type = apartment_type;

    property.estimated_price = estimated_price;

    property.user = findUser;

    property.age = age;

    property.area = area;

    property.agencies = listAgencies;

    // property.address = address;

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
