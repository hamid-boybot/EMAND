import { Repository, EntityRepository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoreDTO } from './dto/create-store.dto';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

@EntityRepository(Store)
export class StoreRepository extends Repository<Store> {
  async deleteStore(id, user): Promise<{}> {
    console.log(id, user);
    const findStore = await this.findOne({ id_store: id });

    if (!findStore) {
      throw new NotFoundException('Store not found');
    }

    const findUser = await this.findOne({ id_store: id, user: user.id_user });

    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to delete this store',
      );
    }

    const result = await this.createQueryBuilder()
      .delete()
      .from(Store)
      .where('id_store = :id', { id: id })
      // .andWhere('user = :id', { id: user.id_user })
      .execute();

    return result;
  }

  async updateStore(createStoreDto: CreateStoreDTO, user, id): Promise<Store> {
    const { name, description, picture, store_type, hour } = createStoreDto;

    const findStore = await this.findOne({ id_store: id });

    if (!findStore) {
      throw new NotFoundException('Store not found');
    }

    console.log(user);
    const findUser = await this.findOne({ id_store: id, user: user.id_user });

    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to update this Store',
      );
    }

    await this.createQueryBuilder()
      .update(Store)
      .set({
        name: name,
        description: description,
        picture: picture,
        store_type: store_type,
        hour: hour,
      })
      .where({ id_store: id })
      .execute();

    return await this.findOne({ id_store: id });
  }
}
