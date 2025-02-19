import { Module } from '@nestjs/common';
import { PrivateFileService } from './private-file.service';
import PrivateFile from './entities/private-file-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateFile]), ConfigModule],
  providers: [PrivateFileService],
  exports: [PrivateFileService],
})
export class PrivateFileModule {}
