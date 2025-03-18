import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { InMemoryCommentRepository } from './repositories/in-memory-comment.repository';
import { CommentRepository } from './repositories/comment-repository.interface';

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: CommentRepository,
          useClass: InMemoryCommentRepository,
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
