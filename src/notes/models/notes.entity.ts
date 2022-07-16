import { CategoriesEntity } from 'src/categories/models/categories.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('note')
export class NoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  text: string;

  @Column({ default: false })
  archived: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToMany(() => CategoriesEntity, category => category.notes)
  @JoinTable({
    name: 'notes_categories',
    joinColumn: {
      name: 'note_id',
    },
    inverseJoinColumn: {
      name: 'categories_id',
    },
  })
  categories: CategoriesEntity[];
}
