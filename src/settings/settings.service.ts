import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Region } from '../seed/entities/regions.entity';
import { City } from '../seed/entities/city.entity';
import { District } from '../seed/entities/districts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from 'src/seed/entities/language.entity';
import { Specialty } from 'src/seed/entities/specialty.entity';
import { Certificate } from 'src/seed/entities/certificate.entity';
@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Language)
    private readonly languagesRepository: Repository<Language>,
    @InjectRepository(Specialty)
    private readonly specialtiesRepository: Repository<Specialty>,
    @InjectRepository(Certificate)
    private readonly certificatesRepository: Repository<Certificate>,
  ) {}
  async getRegions() {
    console.log('🚀 ~ SettingsService ~ getRegions ~ getRegions is called:');
    const regionsList = await this.regionRepository.find();
    return {
      data: regionsList,
      description: 'List of all regions',
    };
  }
  async getCities(id?: string) {
    console.log('🚀 ~ SettingsService ~ getCities ~ getCities  is called:');
    const citiesList = await this.cityRepository.find({
      where: { region: { id } },
    });
    return {
      data: citiesList,
      description: 'List of all cities',
    };
  }
  async getDistricts(id?: string) {
    console.log(
      '🚀 ~ SettingsService ~ getDistricts ~ getDistricts  is called:',
    );
    const districtsList = await this.districtRepository.find({
      where: { city: { id } },
    });
    return {
      data: districtsList,
      description: 'List of all districts',
    };
  }
  async getLanguages() {
    console.log(
      '🚀 ~ SettingsService ~ getLanguages ~ getLanguages is called:',
    );
    const languesList = await this.languagesRepository.find();
    return {
      data: languesList,
      description: 'List of all langues',
    };
  }
  async getSpecialties() {
    console.log(
      '🚀 ~ SettingsService ~ getSpecialties ~ getSpecialties  is called:',
    );
    const specialtiesList = await this.specialtiesRepository.find();
    return {
      data: specialtiesList,
      description: 'List of all specialties',
    };
  }
  async getCertificates() {
    console.log(
      '🚀 ~ SettingsService ~ getCertificates ~ getCertificates  is called:',
    );
    const certificatesList = await this.certificatesRepository.find();
    return {
      data: certificatesList,
      description: 'List of all certificates',
    };
  }

  // async getOneCity(id: string) {
  //   console.log(`🚀 -- getOneCity is called:`);
  //   const cityFound = await this.cityRepository.findOne({
  //     where: { regionId: id },
  //   });
  //   if (!cityFound) throw new NotFoundException(`City with ${id} not found`);
  //   return {
  //     data: cityFound,
  //     description: `City found with ${id}`,
  //   };
  // }
}
