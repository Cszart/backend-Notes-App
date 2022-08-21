import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';

// Categories
import { CategoryI } from '../models/categories.interface';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categorieService: CategoriesService) {}

  @Post()
  async createCategory(@Body() categoryData: CategoryI): Promise<Observable<CategoryI>> {
    return await this.categorieService.createCategory(categoryData);
  }

  @Get('/all')
  async findAllCategories(): Promise<Observable<CategoryI[]>> {
    return await this.categorieService.findAllCategories();
  }

  @Get(':id')
  async findOneCategory(@Param('id') id: number): Promise<CategoryI> {
    return await this.categorieService.findOneCategory(id);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: number, @Body() categoryData: CategoryI): Promise<Observable<CategoryI>> {
    return await this.categorieService.updateCategory(id, categoryData);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number): Observable<DeleteResult> {
    return this.categorieService.deleteCategory(id);
  }
}
