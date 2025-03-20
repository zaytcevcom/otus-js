import { ProblemRatingRepository } from './problem-rating-repository.interface';
import { ProblemRating } from '../entities/problem-rating.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DbProblemRatingRepository implements ProblemRatingRepository {
  constructor(
    @InjectRepository(ProblemRating)
    private readonly typeOrmRepository: Repository<ProblemRating>,
  ) {}

  async create(data: Partial<ProblemRating>): Promise<ProblemRating> {
    const rating = this.typeOrmRepository.create(data);
    return this.typeOrmRepository.save(rating);
  }

  async getAll(): Promise<ProblemRating[]> {
    return this.typeOrmRepository.find();
  }

  async getAllByProblemId(problemId: number): Promise<ProblemRating[]> {
    return (await this.typeOrmRepository.find({ where: { problemId } })) || [];
  }

  async findById(id: number): Promise<ProblemRating | null> {
    return this.typeOrmRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    data: Partial<ProblemRating>,
  ): Promise<ProblemRating> {
    await this.typeOrmRepository.update(id, data);
    const rating = await this.typeOrmRepository.findOne({ where: { id } });
    if (!rating) {
      throw new Error(`ProblemRating with id ${id} not found`);
    }
    return rating;
  }

  async remove(id: number): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }
}
