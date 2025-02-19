import { Module } from '@nestjs/common';
import { TechniciansService } from './technicians.service';
import { TechniciansController } from './technicians.controller';
import { Technician } from './entities/technician.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/seed/entities/city.entity';
import { District } from 'src/seed/entities/districts.entity';
import { Region } from 'src/seed/entities/regions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Technician, City, District, Region])],
  controllers: [TechniciansController],
  providers: [TechniciansService],
})
export class TechniciansModule {}
