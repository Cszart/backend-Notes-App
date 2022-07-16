import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

// Notes
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { NoteEntity } from './models/notes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
