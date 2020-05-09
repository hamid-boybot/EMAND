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
import { CreatePropertyDTO } from './dto/create-property.dto';
import { PropertyService } from './property.service';
import { Property } from './property.entity';
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
import { FilterPropertyDTO } from './dto/filter-property.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiBearerAuth()
@ApiTags('Property')
@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Get('/search')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'return the properties corresponding to the search parameters',
  })
  async findProperty(
    @Query() filterPropertyDTO: FilterPropertyDTO,
    @getUser() user,
  ) {
    return await this.propertyService.findProperty(filterPropertyDTO, user);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async getProperty(@Param('id') id, @getUser() user): Promise<{}> {
    return await this.propertyService.getProperty(id, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async updateProperty(
    @Body() createPropertyDto: CreatePropertyDTO,
    @getUser() user,
    @Param('id') id,
  ): Promise<Property> {
    return await this.propertyService.updateProperty(
      createPropertyDto,
      user,
      id,
    );
  }

  @Post()
  //@Roles('admin')
  //@UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  async createProperty(
    @Body() createPropertyDto: CreatePropertyDTO,
    @getUser() user,
  ): Promise<Property> {
    return await this.propertyService.createProperty(createPropertyDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async deleteProperty(@Param('id') id, @getUser() user): Promise<{}> {
    return await this.propertyService.deleteProperty(id, user);
  }

  @Post('/test')
  @UseGuards(AuthGuard('jwt'))
  async openRoute(@Body() openRouteDTO: OpenRouteDTO) {
    return await this.propertyService.openRoute(openRouteDTO);
  }
}
