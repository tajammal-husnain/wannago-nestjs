import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import Category from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryEntity: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryEntity.create(createCategoryDto);
    return await this.categoryEntity.save(newCategory);
    return 'This action adds a new category';
  }

  async findAll() {
    return await this.categoryEntity.find();
    return `This action returns all categories`;
  }

  async findOne(id: string) {
    const category = await this.categoryEntity.findOne({ where: { id: id } });
    if (category) {
      return category;
    }
    throw new NotFoundException({
      message: `Category with id ${id} not found`,
    });
    return `This action returns a #${id} category`;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryEntity.update(id, updateCategoryDto);
    const updatedCategory = await this.categoryEntity.findOneBy({ id: id });
    if (updatedCategory) {
      return updatedCategory;
    }
    throw new NotFoundException({
      message: `Post to update with ${id} not found`,
    });
    return `This action updates a #${id} category`;
  }

  async remove(id: string) {
    return await this.categoryEntity.delete({ id: id });
    return `This action removes a #${id} category`;
  }
}
