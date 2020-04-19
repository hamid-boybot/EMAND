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
import { CreateOrderDTO } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import {
  ApiTags,
  ApiBearerAuth,
  ApiProperty,
  ApiParam,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from '../common/decorators/get-user.decorator';
import { FilterOrderDTO } from './dto/filter-order.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiBearerAuth()
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/owner-orders/:id')
  @UseGuards(AuthGuard('jwt')) // protection de la route par authentification json web token
  @ApiParam({ name: 'id' }) // pour swagger
  // pour nestJs =>
  async getOrders(@Param('id') id_store, @getUser() user) {
    return await this.orderService.getOrders(id_store, user);
  }

  @Get('/search')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'return the orders corresponding to the search parameters',
  })
  async findOrder(@Query() filterOrderDTO: FilterOrderDTO, @getUser() user) {
    return await this.orderService.findOrder(filterOrderDTO, user);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async getOrder(@Param('id') id, @getUser() user): Promise<{}> {
    return await this.orderService.getOrder(id, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async updateOrder(
    @Body() createOrderDto: CreateOrderDTO,
    @getUser() user,
    @Param('id') id,
  ): Promise<Order> {
    return await this.orderService.updateOrder(createOrderDto, user, id);
  }

  @Post()
  //@Roles('admin')
  //@UseGuards(AuthGuard('jwt'), RolesGuard)
  //@UseGuards(AuthGuard('jwt'))
  async createOrder(
    @Body() createOrderDto: CreateOrderDTO,
    @getUser() user,
  ): Promise<Order> {
    return await this.orderService.createOrder(createOrderDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async deleteOrder(@Param('id') id, @getUser() user): Promise<{}> {
    return await this.orderService.deleteOrder(id, user);
  }
}
