import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/users/services/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(email: string, password: string) {
    console.log(
      `🚀 -- email: string, password: string is called:`,
      email,
      password,
    );
    const verifiedUser = await this.getAuthenticatedUser(email, password);
    console.log(`🚀 -- verifiedUser is called:`, verifiedUser);
    if (!verifiedUser) return verifiedUser;

    const token = this.jwtService.sign({ id: verifiedUser.id });

    verifiedUser.password = null;

    const userResponse = {
      data: { user: verifiedUser, token: token },
    };
    return userResponse;
  }

  public async getAuthenticatedUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    if (!user) throw new NotFoundException(`User not found for email ${email}`);

    const isPasswordMatched = await this.verifyPassword(
      password,
      user.password,
    );
    if (!isPasswordMatched) throw new BadRequestException(`Invalid password`);

    return user;
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
      throw new BadRequestException('Wrong credentials provided');
    }
    return isPasswordMatched;
  }

  // async login(email: string, password: string) {
  //   try {
  //     // Fetch the user and verify credentials
  //     const verifiedUser = await this.getAuthenticatedUser(email, password);

  //     // Generate the JWT token
  //     const token = this.jwtService.sign({ id: verifiedUser.id });

  //     // Return the response
  //     return this.createUserResponse(verifiedUser, token);
  //   } catch (error) {
  //     // Catching and re-throwing errors with proper HTTP exceptions
  //     throw error; // Let the NestJS global error handler manage the response
  //   }
  // }

  // async getAuthenticatedUser(email: string, password: string) {
  //   const user = await this.userService.getByEmail(email);
  //   if (!user) {
  //     throw new NotFoundException(`User not found for email ${email}`);
  //   }

  //   // Using a single function to verify password and handle error
  //   await this.verifyPassword(password, user.password);

  //   return user;
  // }

  // private async verifyPassword(
  //   plainTextPassword: string,
  //   hashedPassword: string,
  // ) {
  //   const isPasswordMatched = await bcrypt.compare(
  //     plainTextPassword,
  //     hashedPassword,
  //   );
  //   if (!isPasswordMatched) {
  //     throw new BadRequestException('Invalid password');
  //   }
  // }

  // private createUserResponse(user: any, token: string) {
  //   // Return the user data along with the token
  //   return plainToInstance(SuperAdmin, {
  //     data: user,
  //     token: token,
  //   });
  // }

  public getCookiesWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token};HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  public getCookiesForLogout() {
    return `Authentication=;HttpOnly; Path=/; Max-Age=0`;
  }
}
