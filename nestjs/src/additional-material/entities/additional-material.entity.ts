import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdditionalMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  problemId: number;

  @Column({ type: 'enum', enum: ['file', 'link'] })
  type: 'file' | 'link';

  @Column()
  content: string; // URL для ссылок или путь к файлу

  @Column()
  description: string;
}
