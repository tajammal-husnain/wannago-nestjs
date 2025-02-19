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
    return this.regionRepository.find();
  }
  async getCities(id?: string) {
    console.log('🚀 ~ SettingsService ~ getCities ~ getCities  is called:');
    return this.cityRepository.find({ where: { region: { id } } });
  }
  async getDistricts(id?: string) {
    console.log(
      '🚀 ~ SettingsService ~ getDistricts ~ getDistricts  is called:',
    );
    return this.districtRepository.find({ where: { city: { id } } });
  }
  async getLanguages() {
    console.log(
      '🚀 ~ SettingsService ~ getLanguages ~ getLanguages is called:',
    );
    return this.languagesRepository.find();
  }
  async getSpecialties() {
    console.log(
      '🚀 ~ SettingsService ~ getSpecialties ~ getSpecialties  is called:',
    );
    return this.specialtiesRepository.find();
  }
  async getCertificates() {
    console.log(
      '🚀 ~ SettingsService ~ getCertificates ~ getCertificates  is called:',
    );
    return this.certificatesRepository.find();
  }
}
