import { Controller, Get, Query } from '@nestjs/common';
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
  getCitiesList(@Query('id') id: string) {
    console.log(`🚀 -- id is called:`, id);
    return this.settingsService.getCities(id);
  }

  @Get('districts')
  @ApiOperation({ summary: 'Get list of districts' })
  @ApiResponse({ status: 200, description: 'List of all districts' })
  getDistrictsList(@Query('id') id: string) {
    return this.settingsService.getDistricts(id);
  }

  @Get('languages')
  @ApiOperation({ summary: 'Get list of regions' })
  @ApiResponse({ status: 200, description: 'List of all regions' })
  getLanguages() {
    return this.settingsService.getLanguages();
  }

  @Get('specialties')
  @ApiOperation({ summary: 'Get list of regions' })
  @ApiResponse({ status: 200, description: 'List of all regions' })
  getSpecialties() {
    return this.settingsService.getSpecialties();
  }

  @Get('certificates')
  @ApiOperation({ summary: 'Get list of regions' })
  @ApiResponse({ status: 200, description: 'List of all regions' })
  getCertificates() {
    return this.settingsService.getCertificates();
  }

  // @Get('city')
  // @ApiOperation({ summary: 'Get city through id' })
  // @ApiResponse({ status: 200, description: 'Find city using city id' })
  // getOneCity(@Param() id: string) {
  //   console.log(`🚀 -- id is called:`, id);
  //   return this.settingsService.getOneCity(id);
  // }
}
