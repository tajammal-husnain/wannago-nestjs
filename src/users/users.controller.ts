import { Express, Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import RequestWithUser from 'src/authentication/constants/requestWithUser.interface';
import FilePath from './dto/file-path.dto';
import { User } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  async getUser() {
    return await this.userService.getAllUsers();
  }

  @Get('file-url')
  @UseGuards(JwtAuthenticationGuard)
  async getFileUrl(@Body() body: FilePath) {
    console.log(
      `🤖 ~ file: users.controller.ts:50 ~ UsersController ~ getFileUrl ~ path:`,
      body?.path,
    );
    return this.userService.getFileUrl(body?.path);
  }

  @Get('files')
  @UseGuards(JwtAuthenticationGuard)
  async getPrivateFiles(@Req() req: RequestWithUser) {
    console.log(
      `🤖 ~ file: users.controller.ts:83 ~ UsersController ~ getPrivateFiles ~ req:`,
      req,
    );
    return this.userService.getUserPrivateFiles(req?.user?.id);
  }

  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.getUserById(id);
  }

  @Post('avatar')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @Req() req: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.addAvatar(
      req.user.id,
      file.mimetype,
      file.originalname,
      file.buffer,
    );
  }

  @Post('files')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserFile(
    @Req() req: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(
      `🤖 ~ file: users.controller.ts:68 ~ UsersController ~ file:`,
      file,
    );
    return this.userService.addPrivateFile(
      req.user.id,
      file.originalname,
      file.mimetype,
      file.buffer,
    );
  }

  @Delete('avatar')
  @UseGuards(JwtAuthenticationGuard)
  async removeFile(@Body() body: FilePath) {
    return this.userService.removeFile(body?.path);
  }
}
