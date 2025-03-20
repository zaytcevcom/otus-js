import { Test, TestingModule } from '@nestjs/testing';
import { ProblemRatingService } from './problem-rating.service';
import { InMemoryProblemRatingRepository } from './repositories/in-memory-problem-rating.repository';
import { ProblemRatingRepository } from './repositories/problem-rating-repository.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../../data-source';
import { ProblemRating } from './entities/problem-rating.entity';

describe('ProblemRatingService', () => {
  let service: ProblemRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(AppDataSource.options),
        TypeOrmModule.forFeature([ProblemRating]),
      ],
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
