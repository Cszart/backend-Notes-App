import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

// Notes
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { NoteEntity } from './models/notes.entity';

// Categories
import { CategoriesEntity } from 'src/categories/models/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity, CategoriesEntity])],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
