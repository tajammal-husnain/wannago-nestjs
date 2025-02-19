import { Controller, Get } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('regions')
  @ApiOperation({ summary: 'Get list of regions' })
  @ApiResponse({ status: 200, description: 'List of all regions' })
  getRegions() {
    return this.settingsService.getRegions();
  }

  @Get('cities')
  @ApiOperation({ summary: 'Get list of cities' })
  @ApiResponse({ status: 200, description: 'List of all cities' })
  getCitiesList() {
    return this.settingsService.getCities();
  }

  @Get('districts')
  @ApiOperation({ summary: 'Get list of districts' })
  @ApiResponse({ status: 200, description: 'List of all districts' })
  getDistrictsList() {
    return this.settingsService.getDistricts();
  }

  @Get('languages')
  @ApiOperation({ summary: 'Get list of regions' })
  @ApiResponse({ status: 200, description: 'List of all regions' })
  getLanguages() {
    return this.settingsService.getRegions();
  }

  @Get('specialties')
  @ApiOperation({ summary: 'Get list of regions' })
  @ApiResponse({ status: 200, description: 'List of all regions' })
  getSpecialties() {
    return this.settingsService.getRegions();
  }

  @Get('certificates')
  @ApiOperation({ summary: 'Get list of regions' })
  @ApiResponse({ status: 200, description: 'List of all regions' })
  getCertificates() {
    return this.settingsService.getRegions();
  }
}
