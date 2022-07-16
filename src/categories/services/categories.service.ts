import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CategoriesEntity } from '../models/categories.entity';
import { CategoryI } from '../models/categories.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private categoryRepository: Repository<CategoriesEntity>,
  ) {}

  // Create
  async createCategory(categoryData: CategoryI): Promise<Observable<CategoryI>> {
    return from(this.categoryRepository.save(categoryData));
  }

  // Find all
  async findAllCategories(): Promise<Observable<CategoryI[]>> {
    return from(this.categoryRepository.find());
  }

  // Find one
  async findOneCategory(id: number): Promise<CategoryI> {
    try {
      const categoryDataID = await this.categoryRepository.findOneBy({ id: id });

      if (categoryDataID) {
        return categoryDataID;
      } else {
        throw new NotFoundException('Could not find note');
      }
    } catch (error) {
      throw new NotFoundException('Could not find note');
    }
  }

  // Update
  async updateCategory(id: number, categoryData: CategoryI): Promise<Observable<CategoryI>> {
    const updateCategory = await this.categoryRepository.findOne({ where: { id: id } });
    updateCategory.name = categoryData.name;

    return from(this.categoryRepository.save(updateCategory));
  }

  // Delete
  deleteCategory(id: number): Observable<DeleteResult> {
    return from(this.categoryRepository.delete(id));
  }
}
