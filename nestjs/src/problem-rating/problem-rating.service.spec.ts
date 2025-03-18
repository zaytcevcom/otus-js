import { Test, TestingModule } from '@nestjs/testing';
import { ProblemRatingService } from './problem-rating.service';
import { InMemoryProblemRatingRepository } from './repositories/in-memory-problem-rating.repository';
import { ProblemRatingRepository } from './repositories/problem-rating-repository.interface';

describe('ProblemRatingService', () => {
  let service: ProblemRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProblemRatingService,
        {
          provide: ProblemRatingRepository,
          useClass: InMemoryProblemRatingRepository,
        },
      ],
    }).compile();

    service = module.get<ProblemRatingService>(ProblemRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
