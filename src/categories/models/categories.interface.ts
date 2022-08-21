import { NoteI } from 'src/notes/models/notes.interface';

// Basic structure
export interface CategoryI {
  id?: number;
  name: string;

  notes: NoteI[];
}
