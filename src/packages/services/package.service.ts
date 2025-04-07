import { Injectable, Logger } from '@nestjs/common';
import { CreatePackageDto } from '../dtos/create-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PackageEntity from '../entities/package.entity';

@Injectable()
export class PackagesService {
  private readonly logger = new Logger(PackagesService.name);

  constructor(
    @InjectRepository(PackageEntity)
    private packageService: Repository<PackageEntity>,
  ) {}
  async createPackage(createPackageInput: CreatePackageDto) {
    try {
      const packageObj = this.packageService.create(createPackageInput);
      await this.packageService.save(packageObj);
      return packageObj;
    } catch (error) {
      this.logger.error(
        `Error occurred while saving package ${error?.message}`,
      );
    }
  }
}
