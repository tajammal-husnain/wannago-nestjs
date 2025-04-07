import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OfferedServicesService } from '../services/offered-services.service';
import { CreateServiceDto } from '../dtos/create-service.dto';

@Controller('offered-services')
export class OfferedServicesController {
  constructor(private offeredServices: OfferedServicesService) {}

  @Post()
  createService(@Body() input: CreateServiceDto) {
    return this.offeredServices.createService(input);
  }

  @Get()
  getAllServices() {
    return this.offeredServices.getAll();
  }

  @Get(':id')
  getServiceById(@Param('id') id: string) {
    return this.offeredServices.getOneService(id);
  }
}
