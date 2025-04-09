import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'src/seed/entities/regions.entity';
import { City } from 'src/seed/entities/city.entity';
import { District } from 'src/seed/entities/districts.entity';
import { Language } from 'src/seed/entities/language.entity';
import { Specialty } from 'src/seed/entities/specialty.entity';
import { Certificate } from 'src/seed/entities/certificate.entity';
import { Permission } from 'src/seed/entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Region,
      City,
      District,
      Language,
      Specialty,
      Certificate,
      Permission,
    ]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
