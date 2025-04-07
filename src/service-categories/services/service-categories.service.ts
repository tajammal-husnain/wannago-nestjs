import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { BaseResponse } from 'src/shared/dtos/base-api-response';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category)
      throw new NotFoundException(`Category with ID ${id} not found`);
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category)
      throw new NotFoundException(`Category with ID ${id} not found`);
    await this.categoryRepository.update(id, updateCategoryDto);
    return await this.findOne(id);
  }

  async delete(id: string): Promise<BaseResponse> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category)
      throw new NotFoundException(`Category with ID ${id} not found`);
    await this.categoryRepository.update(id, { isDeleted: true });
    return {
      message: `Category with ID ${id} deleted successfully`,
    };
  }
}
