import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferedServicesService } from './services/offered-services.service';
import { OfferedServicesController } from './controller/offered-services.controller';
import { OfferedService } from './entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfferedService])],
  providers: [OfferedServicesService],
  controllers: [OfferedServicesController],
})
export class OfferedServicesModule {}
