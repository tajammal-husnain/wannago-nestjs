import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import LocalAuthenticationGuard from './guards/localAuthentication.guard';
import RequestWithUser from './constants/requestWithUser.interface';
import { Response } from 'express';
import { RegisterUserDto } from 'src/users/dto/register.dto';
import User from 'src/users/entities/user.entity';
import { plainToClass } from 'class-transformer';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('register')
  async registerUser(@Body() userBody: RegisterUserDto) {
    return this.authenticationService.registerUser(userBody);
  }

  @HttpCode(200)
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthenticationGuard)
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authenticationService.getCookiesWithJwtToken(user?.id);
    request.res.setHeader('Set-Cookie', cookie);
    // const userResponse = plainToClass(User, user);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Res() response: Response) {
    return response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookiesForLogout(),
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }
}
