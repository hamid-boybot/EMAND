import { Repository, EntityRepository } from 'typeorm';
import { Property, PropertyType, ApartmentType } from './property.entity';
import { CreatePropertyDTO } from './dto/create-property.dto';
import { FilterPropertyDTO, SortType } from './dto/filter-property.dto';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

@EntityRepository(Property)
export class PropertyRepository extends Repository<Property> {
  async findProperty(filterPropertyDTO: FilterPropertyDTO, user) {
    let {
      search,
      property_type,
      take,
      skip,
      sort,
      estimated_price,
      city,
      area,
    } = filterPropertyDTO;
    take = take || 10;
    skip = skip || 0;

    const query = this.createQueryBuilder('property');

    if (property_type) {
      query.andWhere('property.property_type=:property_type', {
        property_type,
      });
    }

    if (estimated_price) {
      query.andWhere('property.estimated_price <= :estimated_price', {
        estimated_price,
      });
    }

    if (area) {
      query.andWhere('property.area <= :area', { area });
    }
    if (city) {
      query.andWhere('property.adress.city ILIKE : city', { city });
    }
    if (search) {
      query.andWhere(
        'property.name ILIKE :search OR property.description ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (sort === SortType.estimated_price) {
      query.orderBy({ 'property.estimated_price': 'ASC' });
    }

    if (sort === SortType.area) {
      query.orderBy({ 'property.area': 'ASC' });
    }

    if (sort === SortType.city) {
      query.orderBy({ 'property.address.city': 'ASC' });
    }

    const properties: any = await query
      .take(take)
      .skip(skip)
      .getManyAndCount();

    return properties;
  }

  async getProperty(id, user): Promise<{}> {
    let findProperty;

    try {
      const query = await this.createQueryBuilder('property').where(
        'property.id_property=:id',
        { id },
      );

      findProperty = await query.getOne();
    } catch (error) {
      console.log(error);
      throw new NotFoundException('not found ');
    }

    return findProperty;
  }

  async deleteProperty(id, user): Promise<{}> {
    const findProperty = await this.findOne({ id_property: id });

    if (!findProperty) {
      throw new NotFoundException('Property not found');
    }

    const findUser = await this.findOne({
      id_property: id,
      user: user.id_user,
    });

    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to delete this property',
      );
    }

    const result = await this.createQueryBuilder()
      .delete()
      .from(Property)
      .where('id_property = :id', { id: id })
      // .andWhere('user = :id', { id: user.id_user })
      .execute();

    return result;
  }

  async updateProperty(
    createPropertyDto: CreatePropertyDTO,
    user,
    id,
  ): Promise<Property> {
    const {
      name,
      description,
      pictures,
      property_type,
      estimated_price,
      apartment_type,
      area,
      address,
    } = createPropertyDto;

    const findProperty = await this.findOne({ id_property: id });

    if (!findProperty) {
      throw new NotFoundException('Property not found');
    }

    console.log(user);
    const findUser = await this.findOne({
      id_property: id,
      user: user.id_user,
    });

    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to update this property',
      );
    }

    await this.createQueryBuilder()
      .update(Property)
      .set({
        name: name,
        description: description,
        pictures: pictures,
        property_type: property_type,
        estimated_price: estimated_price,
        user: user,
        apartment_type: apartment_type,
        area: area,
        address: address,
      })
      .where({ id_property: id })
      .execute();

    return await this.findOne({ id_property: id });
  }
}
