import { BaseRepository } from '../../common/repositories/base.repository';
import { Problem } from '../entities/problem.entity';

export abstract class ProblemRepository extends BaseRepository<Problem> {}
