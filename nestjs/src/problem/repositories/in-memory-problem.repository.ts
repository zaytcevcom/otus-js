import { ProblemRepository } from './problem-repository.interface';
import { Problem } from '../entities/problem.entity';

export class InMemoryProblemRepository implements ProblemRepository {
  private problems: Problem[] = [];

  async create(data: Partial<Problem>): Promise<Problem> {
    const problem = { id: this.problems.length + 1, ...data } as Problem;
    this.problems.push(problem);
    return Promise.resolve(problem);
  }

  async getAll(): Promise<Problem[]> {
    return Promise.resolve(this.problems);
  }

  async findById(id: number): Promise<Problem | null> {
    return Promise.resolve(this.problems.find((u) => u.id === id) || null);
  }

  async update(id: number, data: Partial<Problem>): Promise<Problem> {
    const index = this.problems.findIndex((u) => u.id === id);
    if (index === -1) throw Error(`Problem with id ${id} does not exist`);
    this.problems[index] = { ...this.problems[index], ...data };
    return Promise.resolve(this.problems[index]);
  }

  async remove(id: number): Promise<void> {
    const index = this.problems.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.problems.splice(index, 1);
    }
    return Promise.resolve();
  }
}
