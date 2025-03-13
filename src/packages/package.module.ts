import { Module } from '@nestjs/common';
import { PackagesService } from './services/package.service';
import PackageController from './controller/package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import PackageEntity from './entities/package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackageEntity])],
  controllers: [PackageController],
  providers: [PackagesService],
})
export class PackageModule {}
