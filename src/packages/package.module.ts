import { Module } from '@nestjs/common';
import { PackagesService } from './services/package.service';
import PackageController from './controller/package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [PackageController],
  providers: [PackagesService],
})
export class PackageModule {}
