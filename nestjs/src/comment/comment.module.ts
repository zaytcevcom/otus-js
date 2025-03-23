import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { InMemoryCommentRepository } from './repositories/in-memory-comment.repository';
import { CommentRepository } from './repositories/comment-repository.interface';

@Module({
  controllers: [CommentController],
  providers: [
    CommentService,
    {
      provide: CommentRepository,
      useClass: InMemoryCommentRepository,
    },
  ],
})
export class CommentModule {}
