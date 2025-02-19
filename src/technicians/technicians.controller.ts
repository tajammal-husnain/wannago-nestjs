import { Body, Controller, Post } from '@nestjs/common';
import { TechniciansService } from './technicians.service';
import CreateTechnicianDto from './dto/CreateTechnician.dto';

@Controller('technicians')
export class TechniciansController {
  constructor(private readonly techniciansService: TechniciansService) {}

  @Post()
  createTechnician(@Body() createTechnicianDto: CreateTechnicianDto) {
    console.log(`🚀 -- createTechnicianDto is called:`, createTechnicianDto);
    return this.techniciansService.createTechnician(createTechnicianDto);
  }
}
