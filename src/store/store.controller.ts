import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  UseGuards,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
import { StoreService } from './store.service';
import { Store } from './store.entity';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from '../common/decorators/get-user.decorator';
import { CreateStoreDTO } from './dto/create-store.dto';
import { FilterStoreDTO } from './dto/filter-store.dto';

@ApiBearerAuth()
@ApiTags('Store')
@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get('/')
  async findProduct() {
    return await this.storeService.findStore();
  }

  @Post()
  //@Roles('admin')
  //@UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  async createProduct(
    @Body() createStoretDto: CreateStoreDTO,
    @getUser() user,
  ): Promise<Store> {
    return await this.storeService.createStore(createStoretDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async deleteStore(@Param('id') id, @getUser() user) {
    return await this.storeService.deleteStore(id, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async updateStore(
    @Body() createStoreDto: CreateStoreDTO,
    @getUser() user,
    @Param('id') id,
  ): Promise<Store> {
    return await this.storeService.updateStore(createStoreDto, user, id);
  }

  /*  @Get('/search')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'return the products corresponding to the search parameters',
  })
  async findStore(@Query() filterStoreDTO: FilterStoreDTO, @getUser() user) {
    return await this.storeService.findStore(filterStoreDTO, user);
  } */
}
