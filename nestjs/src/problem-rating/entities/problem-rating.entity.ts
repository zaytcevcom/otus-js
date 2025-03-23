import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProblemRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  problemId: number;

  @Column()
  userId: number;

  @Column()
  rating: number;

  @CreateDateColumn()
  createdAt: Date;
}
