import { Injectable } from '@nestjs/common';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { NoteEntity } from '../models/notes.entity';
import { NoteI } from '../models/notes.interface';

import { from, Observable } from 'rxjs';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly notesRepository: Repository<NoteEntity>,
  ) {}

  createNote(noteData: NoteI): Observable<NoteI> {
    return from(this.notesRepository.save(noteData));
  }

  findAllNotes(): Observable<NoteI[]> {
    return from(this.notesRepository.find());
  }

  findOneNote(id: number): Observable<NoteI> {
    return from(this.notesRepository.findOneBy({ id: id }));
  }

  updateNote(id: number, noteData: NoteI): Observable<UpdateResult> {
    return from(this.notesRepository.update(id, noteData));
  }

  deleteNote(id: number): Observable<DeleteResult> {
    return from(this.notesRepository.delete(id));
  }
}
