import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';

// Notes
import { NoteI } from '../models/notes.interface';
import { NotesService } from '../services/notes.service';

@Controller('notes')
export class NotesController {
  constructor(private noteService: NotesService) {}

  @Post()
  async createNote(@Body() noteData: NoteI): Promise<Observable<NoteI>> {
    return await this.noteService.createNote(noteData);
  }

  @Get('/all')
  async findAllNotes(): Promise<Observable<NoteI[]>> {
    return await this.noteService.findAllNotes();
  }

  @Get(':id')
  async findOneNote(@Param('id') id: number): Promise<Observable<NoteI>> {
    return await this.noteService.findOneNote(id);
  }

  @Get('/archived/:archive')
  async findActiveNotes(@Param('archive') archive: boolean): Promise<NoteI[]> {
    return await this.noteService.findArchivedNotes(archive);
  }

  @Get('/category/:categoryID')
  async findNotesByCategory(@Param('categoryID') categoryID: number): Promise<NoteI[]> {
    return await this.noteService.findNotesByCategory(categoryID);
  }

  @Put(':id')
  async updateNote(@Param('id') id: number, @Body() noteData: NoteI): Promise<Observable<NoteI>> {
    return this.noteService.updateNote(id, noteData);
  }

  @Put('/archive/:id')
  async archiveNote(@Param('id') id: number): Promise<Observable<NoteI>> {
    return await this.noteService.archiveNote(id);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: number): Promise<Observable<DeleteResult>> {
    return await this.noteService.deleteNote(id);
  }
}
