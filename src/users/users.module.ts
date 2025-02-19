import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FilesModule } from 'src/files/files.module';
import Address from './entities/address.entity';
import { PrivateFileModule } from 'src/private-file/private-file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address]),
    FilesModule,
    PrivateFileModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
