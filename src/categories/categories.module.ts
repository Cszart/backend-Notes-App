import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NoteEntity } from 'src/notes/models/notes.entity';

import { CategoriesEntity } from './models/categories.entity';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controller/categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity, CategoriesEntity])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
