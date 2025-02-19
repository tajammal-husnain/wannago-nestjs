import { City } from './entities/city.entity';
import { Region } from './entities/regions.entity';
import { Injectable, Logger } from '@nestjs/common';
import { Language } from './entities/language.entity';
import { District } from './entities/districts.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import {
  regionsData,
  technicianCertificates,
  technicianLanguages,
  technicianSpecialties,
} from './data/seederData';
import { Specialty } from './entities/specialty.entity';
import { Certificate } from './entities/certificate.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Language)
    private readonly languagesRepository: Repository<Language>,
    @InjectRepository(Specialty)
    private readonly specialtiesRepository: Repository<Specialty>,
    @InjectRepository(Certificate)
    private readonly certificatesRepository: Repository<Certificate>,
  ) {}

  async seedData(): Promise<void> {
    this.logger.log('Starting the seeding process...');
    try {
      await this.seedLanguageData();
      await this.seedSpecialtyData();
      await this.seedCertificateEntityData();
      await this.dataSource.transaction(async (manager) => {
        try {
          await this.seedRegionsCitiesAndDistricts(manager);
          this.logger.log('All data seeded successfully!');
        } catch (error) {
          this.logger.error(
            'Error during the seeding transaction:',
            error.message,
          );
          throw error;
        }
      });
    } catch (error) {
      this.logger.error('Error during the seeding process:', error.message);
    }
  }
  private async seedRegionsCitiesAndDistricts(
    manager: EntityManager,
  ): Promise<void> {
    this.logger.log('Seeding regions, cities, and districts...');
    try {
      for (const regionData of regionsData) {
        const existingRegion = await manager.findOne(Region, {
          where: { name: regionData.regionName },
        });
        if (existingRegion) continue;

        const region = manager.create(Region, {
          name: regionData.regionName,
        });
        const savedRegion = await manager.save(region);
        this.logger.log(`Region "${savedRegion.name}" saved.`);

        for (const cityData of regionData.cities) {
          const existingCity = await manager.findOne(City, {
            where: { name: cityData.name },
          });
          if (existingCity) continue;

          const city = manager.create(City, {
            name: cityData.name,
            region: savedRegion,
          });
          const savedCity = await manager.save(city);
          this.logger.log(
            `  City "${savedCity.name}" saved under Region "${savedRegion.name}".`,
          );

          for (const districtData of cityData.districts) {
            const existingDistrict = await manager.findOne(District, {
              where: { name: districtData.name },
            });
            if (existingDistrict) continue;

            const district = manager.create(District, {
              name: districtData.name,
              city: savedCity,
            });
            const savedDistrict = await manager.save(district);
            this.logger.log(
              `    District "${savedDistrict.name}" saved under City "${savedCity.name}".`,
            );
          }
        }
      }
    } catch (error) {
      this.logger.error(
        'Error seeding regions, cities, and districts:',
        error.message,
      );
      throw error;
    }
  }
  private async seedLanguageData(): Promise<void> {
    this.logger.log('Starting seeding language data...');
    try {
      for (const languageName of technicianLanguages) {
        const existingLanguage = this.languagesRepository.find({
          where: {
            name: languageName,
          },
        });
        if (existingLanguage) continue;

        const language = this.languagesRepository.create({
          name: languageName,
        });
        await this.languagesRepository.save(language);
      }
    } catch (error: any) {
      this.logger.error('Error seeding language data:', error.message);
    }
  }
  private async seedSpecialtyData(): Promise<void> {
    this.logger.log('Starting seeding specialty data...');
    try {
      for (const specialtyName of technicianSpecialties) {
        const existingSpecialty = this.specialtiesRepository.find({
          where: { name: specialtyName },
        });
        if (existingSpecialty) continue;

        const specialty = this.specialtiesRepository.create({
          name: specialtyName,
        });
        this.specialtiesRepository.save(specialty);
      }
    } catch (error: any) {
      this.logger.log('Error seeding specialty data:', error.message);
    }
  }
  private async seedCertificateEntityData(): Promise<void> {
    this.logger.log('Starting seeding certificates data...');
    try {
      for (const certificateName of technicianCertificates) {
        const existingSpecialty = this.certificatesRepository.find({
          where: { name: certificateName },
        });
        if (existingSpecialty) continue;

        const certificate = this.certificatesRepository.create({
          name: certificateName,
        });
        this.certificatesRepository.save(certificate);
      }
    } catch (error: any) {
      this.logger.log('Error seeding certificates data:', error.message);
    }
  }
}
