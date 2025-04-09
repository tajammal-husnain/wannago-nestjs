import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OfferedServicesService } from '../services/offered-services.service';
import { CreateServiceDto, UpdateServiceDto } from '../dtos/create-service.dto';

@Controller('offered-services')
export class OfferedServicesController {
  constructor(private offeredServices: OfferedServicesService) {}

  @Post()
  createService(@Body() input: CreateServiceDto) {
    return this.offeredServices.createService(input);
  }

  @Get()
  getServices() {
    return this.offeredServices.getAll();
  }

  @Get(':id')
  getService(@Param('id') id: string) {
    return this.offeredServices.getOneService(id);
  }

  @Put(':id')
  updateService(
    @Param('id') id: string,
    @Body() updatedServiceDto: UpdateServiceDto,
  ) {
    return this.offeredServices.updateService(id, updatedServiceDto);
  }
}
