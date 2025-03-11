import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'src/seed/entities/regions.entity';
import { City } from 'src/seed/entities/city.entity';
import { District } from 'src/seed/entities/districts.entity';
import { Language } from 'src/seed/entities/language.entity';
import { Specialty } from 'src/seed/entities/specialty.entity';
import { Certificate } from 'src/seed/entities/certificate.entity';
import { UserController } from './controllers/user.controller';
import { Customer, SuperAdmin, Technician, User } from './entities/user.entity';
import { PrivateFileService } from './services/private-file.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      SuperAdmin,
      User,
      Customer,
      Technician,
      Region,
      City,
      District,
      Language,
      Specialty,
      Certificate,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, PrivateFileService],
  exports: [PrivateFileService, UserService],
})
export class UsersModule {}
