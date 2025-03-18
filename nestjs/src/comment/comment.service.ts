import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './repositories/comment-repository.interface';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}
  async create(createCommentDto: CreateCommentDto, userId: number) {
    const comment = {
      ...createCommentDto,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await this.commentRepository.create(comment);
  }

  async getAllByProblemId(problemId: number) {
    return this.commentRepository.getAllByProblemId(problemId);
  }

  async findById(id: number) {
    const comment = await this.commentRepository.findById(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.update(id, updateCommentDto);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async remove(id: number) {
    await this.commentRepository.remove(id);
  }
}
