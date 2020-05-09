import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StoreRepository } from './store.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStoreDTO } from './dto/create-store.dto';
import { UserRepository } from '../user/user.repository';
import { Store } from './store.entity';
import { FilterStoreDTO } from './dto/filter-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreRepository)
    private readonly storeRepository: StoreRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createStore(createStoreDTO: CreateStoreDTO, user) {
    const findUser = await this.userRepository.findOne({
      id_user: user.id_user,
    });

    if (findUser.user_checked === false) {
      throw new UnauthorizedException(
        'You need to verify your identity first then you could post products',
      );
    }

    const {
      name,
      picture,
      description,
      address,
      store_type,
      hour,
    } = createStoreDTO;

    const store = this.storeRepository.create();

    store.name = name;

    store.description = description;

    store.address = address;

    store.picture = picture;

    store.store_type = store_type;

    store.hour = hour;

    store.user = findUser;

    try {
      await store.save();
    } catch (error) {
      console.log(error);
    }

    return store;
  }

  async deleteStore(id, user): Promise<{}> {
    return await this.storeRepository.deleteStore(id, user);
  }

  async updateStore(createStoreDTO: CreateStoreDTO, user, id): Promise<Store> {
    return await this.storeRepository.updateStore(createStoreDTO, user, id);
  }

  async findStore() {
    return await this.storeRepository.find();
  }
}
