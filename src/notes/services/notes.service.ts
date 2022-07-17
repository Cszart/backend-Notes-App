import { Injectable, NotFoundException } from '@nestjs/common';

import { DeleteResult, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { NoteEntity } from '../models/notes.entity';
import { NoteI } from '../models/notes.interface';

import { from, Observable } from 'rxjs';
import { CategoriesEntity } from 'src/categories/models/categories.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly notesRepository: Repository<NoteEntity>,

    @InjectRepository(CategoriesEntity)
    private readonly categoryRepository: Repository<CategoriesEntity>,
  ) {}

  // Create
  async createNote(noteData: NoteI): Promise<Observable<NoteI>> {
    const newNote = new NoteEntity();

    // Append every key recieved
    Object.keys(noteData).forEach(key => {
      newNote[key] = noteData[key];
    });

    // If note is being created with categories already
    if (noteData.categories != null && noteData.categories != undefined) {
      const categoriesIDs = noteData.categories;

      try {
        const categoriesData = await this.categoryRepository.find({
          where: { id: In(categoriesIDs) },
        });

        if (categoriesData != null) {
          newNote.categories = categoriesData;
        }
      } catch (error) {
        throw new NotFoundException('Could not find note');
      }
    }

    return from(this.notesRepository.save(newNote));
  }

  // Find all
  async findAllNotes(): Promise<Observable<NoteI[]>> {
    return from(this.notesRepository.find({ relations: ['categories'], order: { id: 'DESC' } }));
  }

  // Find one
  async findOneNote(id: number): Promise<Observable<NoteI>> {
    try {
      return from(this.notesRepository.findOne({ where: { id: id }, relations: ['categories'] }));
    } catch (error) {
      throw new NotFoundException('Could not find note');
    }
  }

  // Find Archive
  async findArchivedNotes(archive: boolean): Promise<NoteI[]> {
    return await this.notesRepository.find({ where: { archived: archive }, relations: ['categories'] });
  }

  // Find by category
  async findNotesByCategory(categoryID: number): Promise<NoteI[]> {
    return await this.notesRepository.find({ where: { categories: { id: categoryID } }, relations: ['categories'] });
  }

  // Update
  async updateNote(id: number, noteData: NoteI): Promise<Observable<NoteI>> {
    const updatedNote = await this.notesRepository.findOne({ where: { id: id } });

    // Add text
    if (noteData.text != null && noteData.text != undefined) {
      updatedNote.text = noteData.text;
    }

    // Change categories
    if (noteData.categories != null && noteData.categories != undefined) {
      const categoriesIDs = noteData.categories;

      try {
        const categoriesData = await this.categoryRepository.find({
          where: { id: In(categoriesIDs) },
        });

        if (categoriesData != null && categoriesData != undefined) {
          updatedNote.categories = categoriesData;
        }
      } catch (error) {
        throw new NotFoundException('Could not find note');
      }
    }

    // Save
    return from(this.notesRepository.save(updatedNote));
  }

  // Archive
  async archiveNote(id: number): Promise<Observable<NoteI>> {
    try {
      const noteData = await this.notesRepository.findOneBy({ id: id });

      // If note exist
      if (noteData != null) {
        noteData.archived = !noteData.archived;

        return from(this.notesRepository.save(noteData));
      } else {
        throw new NotFoundException('Could not find note');
      }
    } catch (error) {
      throw new NotFoundException('Could not find note');
    }
  }

  // Delete
  async deleteNote(id: number): Promise<Observable<DeleteResult>> {
    return from(this.notesRepository.delete(id));
  }
}
