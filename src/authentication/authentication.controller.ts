import {
  Get,
  Post,
  Req,
  HttpCode,
  UseGuards,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {
  RequestWithUser,
  UserLoginRequest,
} from './constants/requestWithUser.interface';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
// import LocalAuthenticationGuard from './guards/localAuthentication.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @HttpCode(200)
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  // @UseGuards(LocalAuthenticationGuard)
  async login(@Body() requestBody: UserLoginRequest) {
    const { email, password } = requestBody;
    return this.authenticationService.login(email, password);
    // const cookie = this.authenticationService.getCookiesWithJwtToken(user?.id);
    // requestBody.res.setHeader('Set-Cookie', cookie);
    // const userResponse = plainToInstance(SuperAdmin, user);
    // return userResponse;
  }

  @Post('logout')
  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(200)
  async logout(@Req() request: RequestWithUser) {
    return request.res.setHeader(
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
