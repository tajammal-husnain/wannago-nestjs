import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Files from './entities/public-file-entity';
import { FilesService } from './files.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Files]), ConfigModule],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
