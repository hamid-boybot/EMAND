import { OpenRouteDTO } from './dto/open-route';
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
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Product } from './product.entity';
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
import { FilterProductDTO } from './dto/filter-product.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiBearerAuth()
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/search')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'return the products corresponding to the search parameters',
  })
  async findProduct(
    @Query() filterProductDTO: FilterProductDTO,
    @getUser() user,
  ) {
    return await this.productService.findProduct(filterProductDTO, user);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async getProduct(@Param('id') id, @getUser() user): Promise<{}> {
    return await this.productService.getProduct(id, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async updateProduct(
    @Body() createProductDto: CreateProductDTO,
    @getUser() user,
    @Param('id') id,
  ): Promise<Product> {
    return await this.productService.updateProduct(createProductDto, user, id);
  }

  @Post()
  //@Roles('admin')
  //@UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  async createProduct(
    @Body() createProductDto: CreateProductDTO,
    @getUser() user,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async deleteProduct(@Param('id') id, @getUser() user): Promise<{}> {
    return await this.productService.deleteProduct(id, user);
  }

  @Post('/test')
  @UseGuards(AuthGuard('jwt'))
  async openRoute(@Body() openRouteDTO: OpenRouteDTO) {
    return await this.productService.openRoute(openRouteDTO);
  }
}
