import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentRepository } from './comment-repository.interface';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class DbCommentRepository implements CommentRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly typeOrmRepository: Repository<Comment>,
  ) {}

  async create(data: Partial<Comment>): Promise<Comment> {
    const comment = this.typeOrmRepository.create(data);
    return this.typeOrmRepository.save(comment);
  }

  async getAll(): Promise<Comment[]> {
    return this.typeOrmRepository.find();
  }

  async getAllByProblemId(problemId: number): Promise<Comment[]> {
    return (await this.typeOrmRepository.find({ where: { problemId } })) || [];
  }

  async findById(id: number): Promise<Comment | null> {
    return this.typeOrmRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Comment>): Promise<Comment> {
    await this.typeOrmRepository.update(id, data);
    const comment = await this.typeOrmRepository.findOne({ where: { id } });
    if (!comment) {
      throw new Error(`Comment with id ${id} not found`);
    }
    return comment;
  }

  async remove(id: number): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }
}
