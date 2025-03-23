import { CommentRepository } from './comment-repository.interface';
import { Comment } from '../entities/comment.entity';

export class InMemoryCommentRepository implements CommentRepository {
  private comments: Comment[] = [];

  async create(data: Partial<Comment>): Promise<Comment> {
    const newComment = { id: this.comments.length + 1, ...data } as Comment;
    this.comments.push(newComment);
    return Promise.resolve(newComment);
  }

  async getAll(): Promise<Comment[]> {
    return Promise.resolve(this.comments);
  }

  async getAllByProblemId(problemId: number): Promise<Comment[]> {
    return Promise.resolve(
      this.comments.filter((u) => u.problemId === problemId),
    );
  }

  async findById(id: number): Promise<Comment | undefined> {
    return Promise.resolve(this.comments.find((u) => u.id === id));
  }

  async update(id: number, data: Partial<Comment>): Promise<Comment> {
    const index = this.comments.findIndex((u) => u.id === id);
    if (index === -1) throw Error(`Comment with id ${id} does not exist`);
    this.comments[index] = { ...this.comments[index], ...data };
    return Promise.resolve(this.comments[index]);
  }

  async remove(id: number): Promise<void> {
    const index = this.comments.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.comments.splice(index, 1);
    }
    return Promise.resolve();
  }
}
