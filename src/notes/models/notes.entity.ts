import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
