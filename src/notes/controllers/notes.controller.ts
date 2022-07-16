import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';

// Notes
import { NoteI } from '../models/notes.interface';
import { NotesService } from '../services/notes.service';

@Controller('notes')
export class NotesController {
  constructor(private noteService: NotesService) {}

  @Post()
  createNote(@Body() noteData: NoteI): Observable<NoteI> {
    return this.noteService.createNote(noteData);
  }

  @Get('/all')
  findAllNotes(): Observable<NoteI[]> {
    return this.noteService.findAllNotes();
  }

  @Get(':id')
  findOneNote(@Param('id') id: number): Observable<NoteI> {
    return this.noteService.findOneNote(id);
  }

  @Put(':id')
  // eslint-disable-next-line prettier/prettier
  updateNote(@Param('id') id: number, @Body() noteData: NoteI): Observable<UpdateResult> {
    return this.noteService.updateNote(id, noteData);
  }

  @Delete(':id')
  deleteNote(@Param('id') id: number): Observable<DeleteResult> {
    return this.noteService.deleteNote(id);
  }
}
