import { Test, TestingModule } from '@nestjs/testing';
import { ProblemService } from './problem.service';
import { ProblemRepository } from './repositories/problem-repository.interface';
import { InMemoryProblemRepository } from './repositories/in-memory-problem.repository';

describe('ProblemService', () => {
  let service: ProblemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProblemService,
        {
          provide: ProblemRepository,
          useClass: InMemoryProblemRepository,
        },
      ],
    }).compile();

    service = module.get<ProblemService>(ProblemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
