import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  inputExample: string;

  @Column()
  outputExample: string;

  @Column({ type: 'enum', enum: ['Easy', 'Medium', 'Hard'] })
  difficulty: 'Easy' | 'Medium' | 'Hard';

  @Column('simple-array')
  tags: string[];

  @Column('simple-array')
  additionalMaterials: number[];

  @Column({ type: 'float', nullable: true })
  rating: number;

  @Column()
  createdBy: number; // ID пользователя-создателя

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
