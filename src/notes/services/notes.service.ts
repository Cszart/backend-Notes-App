import { Injectable, NotFoundException } from '@nestjs/common';

import { DeleteResult, ILike, In, Repository } from 'typeorm';
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
    return from(this.notesRepository.find({ order: { id: 'DESC' }, relations: ['categories'] }));
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

  // Find by category ID
  async findNotesByCategory(categoryID: number): Promise<NoteI[]> {
    return await this.notesRepository.find({ where: { categories: { id: categoryID } }, relations: ['categories'] });
  }

  // Find by category NAME
  async findNotesByCategoryName(categoryName: string): Promise<NoteI[]> {
    return await this.notesRepository.find({
      where: { categories: { name: ILike(categoryName) } },
      relations: ['categories'],
    });
  }

  // Update
  async updateNote(id: number, noteData: NoteI): Promise<Observable<NoteI>> {
    const updatedNote = await this.notesRepository.findOne({ where: { id: id } });

    // Add text
    if (noteData.title != null && noteData.title != undefined) {
      updatedNote.title = noteData.title;
    }

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

  // Add Categories
  async addCategories(id: number, categoriesIDs: number[]): Promise<Observable<NoteI>> {
    // Search for the note
    const updatedNote = await this.notesRepository.findOne({ where: { id: id }, relations: ['categories'] });

    // If there is an input
    if (categoriesIDs != null && categoriesIDs != undefined && categoriesIDs.length > 0) {
      try {
        // Filter new categories to add
        const newCategoriesIDs = categoriesIDs
          .map(id => {
            // Filter the current note categories to see if the new category is already added
            const isInCategoriesArray = updatedNote.categories.filter(category_item => category_item.id === id);

            // If it has at least one item then newCategory is already added
            if (isInCategoriesArray.length === 0) {
              return id;
            }
          })
          .filter(item => item !== undefined);

        // Get categories from DB
        const categoriesData = await this.categoryRepository.find({
          where: { id: In(newCategoriesIDs) },
        });

        // If categories exists
        if (categoriesData != null && categoriesData != undefined) {
          updatedNote.categories = updatedNote.categories.concat(categoriesData);
        }
      } catch (error) {
        throw new NotFoundException('Could not find category');
      }
    }

    // Save
    return from(this.notesRepository.save(updatedNote));
  }

  // Remove Categories
  async removeCategories(id: number, categoriesIDs: number[]): Promise<Observable<NoteI>> {
    // Search for the note
    const updatedNote = await this.notesRepository.findOne({ where: { id: id }, relations: ['categories'] });

    // If categories ids not empty
    if (categoriesIDs != null && categoriesIDs != undefined && categoriesIDs.length > 0) {
      // Filter categories to emove
      const categoriesRemoved = updatedNote.categories.filter(
        category_item => !categoriesIDs.includes(category_item.id),
      );

      updatedNote.categories = categoriesRemoved;
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
