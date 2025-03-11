import { Controller, Post } from '@nestjs/common';

@Controller('packages')
export default class PackageController {
  @Post()
  createPackage() {}
}
