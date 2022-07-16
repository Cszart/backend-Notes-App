import { NoteEntity } from 'src/notes/models/notes.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class CategoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @ManyToMany(() => NoteEntity, note => note.categories, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  notes: NoteEntity[];
}
