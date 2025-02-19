import { Injectable, NotFoundException } from '@nestjs/common';
import CreateTechnicianDto from './dto/CreateTechnician.dto';
import { Technician } from './entities/technician.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from 'src/seed/entities/regions.entity';
import { City } from 'src/seed/entities/city.entity';
import { District } from 'src/seed/entities/districts.entity';

@Injectable()
export class TechniciansService {
  constructor(
    @InjectRepository(Technician)
    private techniciansRepository: Repository<Technician>,

    @InjectRepository(Region)
    private regionRepository: Repository<Region>,

    @InjectRepository(City)
    private cityRepository: Repository<City>,

    @InjectRepository(District)
    private districtRepository: Repository<District>,
  ) {}
  async createTechnician(createTechnicianInput: CreateTechnicianDto) {
    const { region, city, district, ...technicianData } = createTechnicianInput;
    const regionObj = await this.regionRepository.findOne({
      where: { id: region },
    });
    if (!regionObj) {
      throw new NotFoundException(`Region with ${region} not found`);
    }
    const cityObj = await this.cityRepository.findOne({ where: { id: city } });
    if (!cityObj) {
      throw new NotFoundException(`City with ${city} id not found`);
    }
    const districtObj = await this.districtRepository.findOne({
      where: { id: district },
    });
    if (!districtObj) {
      throw new NotFoundException(`District with ${district} id not found`);
    }
    const newTechnician = this.techniciansRepository.create({
      ...technicianData,
      region: regionObj,
      city: cityObj,
      district: districtObj,
    });
    await this.techniciansRepository.save(newTechnician);
    return {
      message: 'Technician added successfully',
      technician: newTechnician,
    };
  }
}
