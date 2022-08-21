import { CategoryI } from 'src/categories/models/categories.interface';

// Basic structure
export interface NoteI {
  id?: number;
  title: string;
  text: string;
  archived: boolean;

  createdAt?: Date;

  // Relations
  categories: CategoryI[];
}
