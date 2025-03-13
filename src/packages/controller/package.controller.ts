import { Body, Controller, Post } from '@nestjs/common';
import { CreatePackageDto } from '../dtos/create-package.dto';
import { PackagesService } from '../services/package.service';

@Controller('packages')
export default class PackageController {
  constructor(private readonly packageService: PackagesService) {}
  @Post()
  createPackage(@Body() createPackageInput: CreatePackageDto) {
    return this.packageService.createPackage(createPackageInput);
  }
}
