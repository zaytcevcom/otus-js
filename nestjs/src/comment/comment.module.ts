import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './repositories/comment-repository.interface';
import { Comment } from './entities/comment.entity';
import { DbCommentRepository } from './repositories/db-comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [
    CommentService,
    {
      provide: CommentRepository,
      useClass: DbCommentRepository,
    },
  ],
})
export class CommentModule {}
