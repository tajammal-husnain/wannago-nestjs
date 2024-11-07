import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import LoginUserDto from './dto/loginUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Get('list')
  async getUser() {
    return await this.userService.getAllUsers();
  }

  @Post('register')
  async registerUser(@Body() userBody: CreateUserDto) {
    console.log('🚀 ~ UsersController ~ addUser ~ userBody:', userBody);
    return await this.userService.createUser(userBody);
  }
}
