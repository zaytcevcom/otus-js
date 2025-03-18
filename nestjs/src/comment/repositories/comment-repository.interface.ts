import { BaseRepository } from '../../common/repositories/base.repository';
import { Comment } from '../entities/comment.entity';

export abstract class CommentRepository extends BaseRepository<Comment> {
  abstract getAllByProblemId(problemId: number): Promise<Comment[]>;
}
