import { CategoryI } from 'src/categories/models/categories.interface';

// Basic structure
export interface NoteI {
  id?: number;
  text: string;
  archived: boolean;

  createdAt?: Date;

  categories: CategoryI[];
}
