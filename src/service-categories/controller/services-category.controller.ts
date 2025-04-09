import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { CategoryService } from '../services/service-categories.service';
import { BaseResponse } from 'src/shared/dtos/base-api-response';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<BaseResponse> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<BaseResponse> {
    const categories = await this.categoryService.findAll();
    return { data: categories };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BaseResponse> {
    const category = await this.categoryService.findOne(id);
    return { data: category };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<BaseResponse> {
    const updatedCategory = await this.categoryService.update(
      id,
      updateCategoryDto,
    );
    return {
      data: updatedCategory,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<BaseResponse> {
    return await this.categoryService.delete(id);
  }
}
