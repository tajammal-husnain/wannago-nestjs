import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OfferedService } from '../entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto, UpdateServiceDto } from '../dtos/create-service.dto';
import { BaseResponse } from 'src/shared/dtos/base-api-response';

@Injectable()
export class OfferedServicesService {
  constructor(
    @InjectRepository(OfferedService)
    public readonly offerService: Repository<OfferedService>,
  ) {}

  async createService(input: CreateServiceDto): Promise<OfferedService> {
    const createdService = this.offerService.create(input);
    return this.offerService.save(createdService);
  }

  async getAll(): Promise<BaseResponse> {
    const servicesList = await this.offerService.find();

    if (!servicesList && servicesList?.length <= 0) {
      throw new HttpException('No services found', HttpStatus.NOT_FOUND);
    }
    return { data: servicesList, message: 'Services list' };
  }

  async getOneService(id: string) {
    const foundService = this.offerService.findOne({ where: { id } });

    if (!foundService)
      throw new HttpException(
        `Service with ${id} not found`,
        HttpStatus.NOT_FOUND,
      );

    return { data: foundService };
  }

  async updateService(
    id: string,
    updatedServiceInput: UpdateServiceDto,
  ): Promise<BaseResponse> {
    const foundService = await this.offerService.findOne({ where: { id: id } });
    if (!foundService)
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);

    const updatedService = await this.offerService.update(
      id,
      updatedServiceInput,
    );
    return { data: updatedService, message: 'Service updated' };
  }
}
