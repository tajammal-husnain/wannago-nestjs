import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities/regions.entity';
import { SeederService } from './seed.service';
import { City } from './entities/city.entity';
import { District } from './entities/districts.entity';
import { Language } from './entities/language.entity';
import { Specialty } from './entities/specialty.entity';
import { Certificate } from './entities/certificate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Region,
      City,
      District,
      Language,
      Specialty,
      Certificate,
    ]),
  ],
  providers: [SeederService],
})
export class SeedModule {}
