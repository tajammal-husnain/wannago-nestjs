import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/users/services/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SuperAdmin } from 'src/users/entities/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(email: string, password: string) {
    const verifiedUser = await this.getAuthenticatedUser(email, password);
    if (!verifiedUser)
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);

    const token = this.jwtService.sign({ id: verifiedUser.id });

    const userResponse = plainToInstance(SuperAdmin, {
      data: verifiedUser,
      token: token,
    });
    return userResponse;
  }

  public async getAuthenticatedUser(email: string, password: string) {
    try {
      const user = await this.userService.getByEmail(email);
      const isPasswordMatched = await this.verifyPassword(
        password,
        user.password,
      );
      if (isPasswordMatched) return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatched = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatched) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    return isPasswordMatched;
  }

  public getCookiesWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token};HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  public getCookiesForLogout() {
    return `Authentication=;HttpOnly; Path=/; Max-Age=0`;
  }
}
