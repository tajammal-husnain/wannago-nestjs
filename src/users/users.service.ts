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
import { FilesService } from 'src/files/files.service';
import { PrivateFileService } from 'src/private-file/private-file.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly fileService: FilesService,
    private readonly privateFileService: PrivateFileService,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find();
    if (users && users?.length > 0) {
      return users;
    }
    throw new NotFoundException({ message: 'Users not found' });
  }
  async getUserById(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
      if (user) {
        return user;
      }
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      console.log(
        `🤣 ~ file: users.service.ts:36 ~ UsersService ~ getUserById ~ error:`,
        error,
      );
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  async getById(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  async createUser(userData: CreateUserDto) {
    console.log(
      `🤣 ~ file: users.service.ts:64 ~ UsersService ~ createUser ~ userData:`,
      userData,
    );
    const createdUser = this.userRepository.create(userData);
    await this.userRepository.save(createdUser);
    return createdUser;
  }

  async addAvatar(
    userId: string,
    fileType: string,
    filename: string,
    fileBuffer: Buffer,
  ) {
    const avatar = await this.fileService.uploadPublicFile(
      filename,
      fileType,
      fileBuffer,
    );
    const user = await this.userRepository.findOneBy({ id: userId });
    await this.userRepository.update(userId, {
      ...user,
      avatar,
    });
    return avatar;
  }

  async addPrivateFile(
    userId: string,
    originalname: string,
    mimetype: string,
    buffer: Buffer,
  ) {
    const uploadedFile = await this.privateFileService.uploadPrivateFile(
      userId,
      originalname,
      mimetype,
      buffer,
    );
    const user = await this.userRepository.findOneBy({ id: userId });
    const userFiles = user?.privateFiles;
    userFiles?.push(uploadedFile);
    await this.userRepository.save({
      ...user,
      privateFiles: userFiles,
    });
    return uploadedFile;
  }

  async getFileUrl(filePath: string) {
    const res = this.fileService.getUrl(filePath);
    return res;
  }

  async removeFile(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const fileId: string = user?.avatar?.id;
    if (user?.avatar) {
      const updatedUser: User = {
        ...user,
        avatar: null,
      };
      await this.userRepository.save(updatedUser);
      return this.fileService.removeFileFromAWS(fileId);
    }
    throw new NotFoundException({
      message: 'No avatar found for this user',
    });
  }

  async getUserPrivateFiles(userId: string) {
    const userWithFiles = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['privateFiles'],
    });
    if (userWithFiles) {
      const files = await Promise.all(
        userWithFiles?.privateFiles?.map(async (userFile) => {
          return await this.privateFileService?.getPrivateFileSignedUrl(
            userFile?.key,
          );
        }),
      );
      return {
        ...userWithFiles,
        files,
      };
    }
  }
}
