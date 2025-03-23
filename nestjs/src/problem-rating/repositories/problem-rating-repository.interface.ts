import { BaseRepository } from '../../common/repositories/base.repository';
import { ProblemRating } from '../entities/problem-rating.entity';

export abstract class ProblemRatingRepository extends BaseRepository<ProblemRating> {
  abstract getAllByProblemId(problemId: number): Promise<ProblemRating[]>;
}
