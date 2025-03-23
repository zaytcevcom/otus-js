import { ProblemRatingRepository } from './problem-rating-repository.interface';
import { ProblemRating } from '../entities/problem-rating.entity';

export class InMemoryProblemRatingRepository
  implements ProblemRatingRepository
{
  private problemRatings: ProblemRating[] = [];

  async create(data: Partial<ProblemRating>): Promise<ProblemRating> {
    const newProblemRating = {
      id: this.problemRatings.length + 1,
      ...data,
    } as ProblemRating;
    this.problemRatings.push(newProblemRating);
    return Promise.resolve(newProblemRating);
  }

  async getAll(): Promise<ProblemRating[]> {
    return Promise.resolve(this.problemRatings);
  }

  async getAllByProblemId(problemId: number): Promise<ProblemRating[]> {
    return Promise.resolve(
      this.problemRatings.filter((u) => u.problemId === problemId),
    );
  }

  async findById(id: number): Promise<ProblemRating | undefined> {
    return Promise.resolve(this.problemRatings.find((u) => u.id === id));
  }

  async update(
    id: number,
    data: Partial<ProblemRating>,
  ): Promise<ProblemRating> {
    const index = this.problemRatings.findIndex((u) => u.id === id);
    if (index === -1) throw Error(`ProblemRating with id ${id} does not exist`);
    this.problemRatings[index] = { ...this.problemRatings[index], ...data };
    return Promise.resolve(this.problemRatings[index]);
  }

  async remove(id: number): Promise<void> {
    const index = this.problemRatings.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.problemRatings.splice(index, 1);
    }
    return Promise.resolve();
  }
}
