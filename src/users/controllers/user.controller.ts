import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { TechnicianDTO } from '../dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('technician')
  createTechnician(@Body() createTechnicianDto: TechnicianDTO) {
    return this.userService.createTechnician(createTechnicianDto);
  }
  @Post('customer')
  createCustomer(@Body() createCustomerDto: TechnicianDTO) {
    return this.userService.createCustomer(createCustomerDto);
  }
  @Get('technicians')
  getAllTechnicians() {
    return this.userService.getAllTechnicians();
  }
}
