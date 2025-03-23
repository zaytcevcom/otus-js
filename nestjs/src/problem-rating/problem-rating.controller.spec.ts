import { Test, TestingModule } from '@nestjs/testing';
import { ProblemRatingController } from './problem-rating.controller';
import { ProblemRatingService } from './problem-rating.service';
import { ProblemRatingRepository } from './repositories/problem-rating-repository.interface';
import { InMemoryProblemRatingRepository } from './repositories/in-memory-problem-rating.repository';

describe('ProblemRatingController', () => {
  let controller: ProblemRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemRatingController],
      providers: [
        ProblemRatingService,
        {
          provide: ProblemRatingRepository,
          useClass: InMemoryProblemRatingRepository,
        },
      ],
    }).compile();

    controller = module.get<ProblemRatingController>(ProblemRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
