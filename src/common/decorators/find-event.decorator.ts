import { ValidatorConstraint, ValidationArguments } from 'class-validator';
import { PropertyRepository } from '../../property/property.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'FindProperty', async: true })
@Injectable()
export class FindProperty {
  constructor(
    @InjectRepository(PropertyRepository)
    private readonly propertyRepository: PropertyRepository,
  ) {}

  async validate(value: any, args: ValidationArguments) {
    console.log(typeof value + ' ' + JSON.stringify(args));
    const found = await this.propertyRepository.find();
    if (found) return true;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'User with this email already exists.';
  }
}
