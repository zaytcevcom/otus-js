import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './repositories/comment-repository.interface';
import { InMemoryCommentRepository } from './repositories/in-memory-comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../../data-source';
import { Comment } from './entities/comment.entity';

describe('CommentController', () => {
  let controller: CommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(AppDataSource.options),
        TypeOrmModule.forFeature([Comment]),
      ],
      controllers: [CommentController],
      providers: [
        CommentService,
        {
          provide: CommentRepository,
          useClass: InMemoryCommentRepository,
        },
      ],
    }).compile();

    controller = module.get<CommentController>(CommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
