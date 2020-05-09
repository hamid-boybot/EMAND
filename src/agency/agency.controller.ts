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
import { AgencyService } from './agency.service';
import { Agency } from './agency.entity';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from '../common/decorators/get-user.decorator';
import { CreateAgencyDTO } from './dto/create-agency.dto';
import { FilterAgencyDTO } from './dto/filter-agency.dto';

@ApiBearerAuth()
@ApiTags('Agency')
@Controller('agency')
export class AgencyController {
  constructor(private agencyService: AgencyService) {}

  @Get('/')
  async findAgency() {
    return await this.agencyService.findAgency();
  }

  @Post()
  //@Roles('admin')
  //@UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  async createAgency(
    @Body() createAgencytDto: CreateAgencyDTO,
    @getUser() user,
  ): Promise<Agency> {
    return await this.agencyService.createAgency(createAgencytDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async deleteAgency(@Param('id') id, @getUser() user) {
    return await this.agencyService.deleteAgency(id, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async updateAgency(
    @Body() createAgencyDto: CreateAgencyDTO,
    @getUser() user,
    @Param('id') id,
  ): Promise<Agency> {
    return await this.agencyService.updateAgency(createAgencyDto, user, id);
  }

  /*  @Get('/search')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'return the properties corresponding to the search parameters',
  })
  async findAgency(@Query() filterAgencyDTO: FilterAgencyDTO, @getUser() user) {
    return await this.agencyService.findAgency(filterAgencyDTO, user);
  } */
}
