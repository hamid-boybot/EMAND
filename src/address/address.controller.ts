import { Controller, Post, Body, UseGuards, Put, Param, Get } from '@nestjs/common';
import { CreateAddressDTO } from './dto/create-address.dto';
import { getUser } from '../common/decorators/get-user.decorator';
import { AddressService } from './address.service';
import { Address } from './address.entity';
import { ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createAddress(@Body() createAddressDTO: CreateAddressDTO, @getUser() user): Promise<Address> {
    return this.addressService.createAddress(createAddressDTO, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  updateAddress(@Body() createAddressDTO: CreateAddressDTO, @Param('id') id, @getUser() user): Promise<Address> {
    return this.addressService.updateAddress(createAddressDTO, id, user);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  findAddress(@Param('id') id, @getUser() user): Promise<Address> {
    return this.addressService.findAddress(id, user);
  }
}
