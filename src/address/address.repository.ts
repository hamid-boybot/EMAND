import { EntityRepository, Repository } from 'typeorm';
import { Address } from './address.entity';
import { CreateAddressDTO } from './dto/create-address.dto';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import Axios from 'axios';
import * as config from 'config';

const mapsConfig = config.get('maps');
@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {



  async updateAddress(createAddressDTO: CreateAddressDTO, id, user): Promise<Address> {
    const { name, street, city, state, country, zip_code } = createAddressDTO;
    const address = await this.findOne({ id_address: id, user: user.id_user });
    if (!address) {
      throw new UnauthorizedException('this user can not update this address');
    }
    address.name = name;
    address.street = street;
    address.city = city;
    address.state = state;
    address.country = country;
    address.zip_code = zip_code;

    let gpsLocation;

    const search_location = encodeURI(street + ' ' + city + ' ' + state + ' ' + zip_code + ' ' + country);

    //! il faudra faire attentio à l'encodage de l'adresse,espace et caratere speciaux
    try {
      gpsLocation = await Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${search_location}&key=${mapsConfig.key}`,
      );
      console.log(gpsLocation)
    } catch (e) {
      console.log(e);
    }
    address.lng = gpsLocation.data.results[0].geometry.location.lng;
    address.lat = gpsLocation.data.results[0].geometry.location.lat;

    await address.save();
    return address;
  }

  async findAddress(id, user): Promise<Address> {
    const address = await this.findOne({ id_address: id, user: user.id_user });
    if (!address) {
      throw new NotFoundException('address not found');
    }
    return address;
  }



  async createAddress(createAddressDTO: CreateAddressDTO, user): Promise<Address> {
    const { name, street, city, state, country, zip_code } = createAddressDTO;
    const address = this.create();

    address.name = name;
    address.street = street;
    address.city = city;
    address.state = state;
    address.country = country;
    address.zip_code = zip_code;

    address.user = user;

    let gpsLocation;
    const search_location = encodeURI(street + ' ' + city + ' ' + state + ' ' + zip_code + ' ' + country);

    //! il faudra faire attentio à l'encodage de l'adresse,espace et caratere speciaux
    try {
      gpsLocation = await Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${search_location}&key=${mapsConfig.key}`,
      );

      address.location = {
        type: 'Point',
        coordinates: [gpsLocation.data.results[0].geometry.location.lng, gpsLocation.data.results[0].geometry.location.lat],
      };

      address.lng = gpsLocation.data.results[0].geometry.location.lng;
      address.lat = gpsLocation.data.results[0].geometry.location.lat;

      await address.save();
    } catch (error) {
      console.log(error);
    }

    return address;
  }
}
