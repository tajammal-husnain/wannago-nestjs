import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import User from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find();
    if (users && users?.length > 0) {
      return users;
    }
    throw new NotFoundException({ message: 'Users not found' });
  }
  async getUserById(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id: id });
      if (user) {
        return user;
      }
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      console.log('error', error);
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email: email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  async getById(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  async createUser(userData: CreateUserDto) {
    const createdUser = this.userRepository.create(userData);
    await this.userRepository.save(createdUser);
    return createdUser;
  }
}
