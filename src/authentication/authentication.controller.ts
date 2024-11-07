import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import LocalAuthenticationGuard from './guards/localAuthentication.guard';
import RequestWithUser from './constants/requestWithUser.interface';
import { Response } from 'express';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('register')
  async registerUser(@Body() userBody: CreateUserDto) {
    this.authenticationService.registerUser(userBody);
  }

  @HttpCode(200)
  @Post('login')
  @UseGuards(LocalAuthenticationGuard)
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authenticationService.getCookiesWithJwtToken(user?.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    response.json(user);
  }
}
