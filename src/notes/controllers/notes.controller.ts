import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';

// Notes
import { NoteI } from '../models/notes.interface';
import { NotesService } from '../services/notes.service';

@Controller('notes')
export class NotesController {
  constructor(private noteService: NotesService) {}

  // Create

  @Post()
  async createNote(@Body() noteData: NoteI): Promise<Observable<NoteI>> {
    return await this.noteService.createNote(noteData);
  }

  // Find all

  @Get('/all')
  async findAllNotes(): Promise<Observable<NoteI[]>> {
    return await this.noteService.findAllNotes();
  }

  // Find one

  @Get(':id')
  async findOneNote(@Param('id') id: number): Promise<Observable<NoteI>> {
    return await this.noteService.findOneNote(id);
  }

  // Find Archive

  @Get('/archived/:archive')
  async findActiveNotes(@Param('archive') archive: boolean): Promise<NoteI[]> {
    return await this.noteService.findArchivedNotes(archive);
  }

  // Find by category

  @Get('/category/:categoryID')
  async findNotesByCategory(@Param('categoryID') categoryID: number): Promise<NoteI[]> {
    return await this.noteService.findNotesByCategory(categoryID);
  }

  // Update

  @Put(':id')
  async updateNote(@Param('id') id: number, @Body() noteData: NoteI): Promise<Observable<NoteI>> {
    return this.noteService.updateNote(id, noteData);
  }

  // Add categories

  @Put('/addCategories/:id')
  async addCategories(@Param('id') id: number, @Body() body: { categoriesIDs: number[] }): Promise<Observable<NoteI>> {
    return this.noteService.addCategories(id, body.categoriesIDs);
  }

  // Remove categories

  @Put('/removeCategories/:id')
  async removeCategories(
    @Param('id') id: number,
    @Body() body: { categoriesIDs: number[] },
  ): Promise<Observable<NoteI>> {
    return this.noteService.removeCategories(id, body.categoriesIDs);
  }

  // Archive

  @Put('/archive/:id')
  async archiveNote(@Param('id') id: number): Promise<Observable<NoteI>> {
    return await this.noteService.archiveNote(id);
  }

  // Delete

  @Delete(':id')
  async deleteNote(@Param('id') id: number): Promise<Observable<DeleteResult>> {
    return await this.noteService.deleteNote(id);
  }
}
