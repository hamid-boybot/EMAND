import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AgencyRepository } from './agency.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAgencyDTO } from './dto/create-agency.dto';
import { UserRepository } from '../user/user.repository';
import { Agency } from './agency.entity';
import { FilterAgencyDTO } from './dto/filter-agency.dto';

@Injectable()
export class AgencyService {
  constructor(
    @InjectRepository(AgencyRepository)
    private readonly agencyRepository: AgencyRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createAgency(createAgencyDTO: CreateAgencyDTO, user) {
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
      picture,
      description,
      address,
      agency_type,
      hour,
    } = createAgencyDTO;

    const agency = this.agencyRepository.create();

    agency.name = name;

    agency.description = description;

    agency.address = address;

    agency.picture = picture;

    agency.agency_type = agency_type;

    agency.hour = hour;

    agency.user = findUser;

    try {
      await agency.save();
    } catch (error) {
      console.log(error);
    }

    return agency;
  }

  async deleteAgency(id, user): Promise<{}> {
    return await this.agencyRepository.deleteAgency(id, user);
  }

  async updateAgency(
    createAgencyDTO: CreateAgencyDTO,
    user,
    id,
  ): Promise<Agency> {
    return await this.agencyRepository.updateAgency(createAgencyDTO, user, id);
  }

  async findAgency() {
    return await this.agencyRepository.find();
  }
}
