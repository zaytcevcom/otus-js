import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProblemRepository } from './problem-repository.interface';
import { Problem } from '../entities/problem.entity';

@Injectable()
export class DbProblemRepository implements ProblemRepository {
  constructor(
    @InjectRepository(Problem)
    private readonly typeOrmRepository: Repository<Problem>,
  ) {}

  async create(data: Partial<Problem>): Promise<Problem> {
    const problem = this.typeOrmRepository.create(data);
    return this.typeOrmRepository.save(problem);
  }

  async getAll(): Promise<Problem[]> {
    return this.typeOrmRepository.find();
  }

  async findById(id: number): Promise<Problem | null> {
    return this.typeOrmRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Problem>): Promise<Problem> {
    await this.typeOrmRepository.update(id, data);
    const problem = await this.typeOrmRepository.findOne({ where: { id } });
    if (!problem) {
      throw new Error(`Problem with id ${id} not found`);
    }
    return problem;
  }

  async remove(id: number): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }
}
