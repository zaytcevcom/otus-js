import { Test, TestingModule } from '@nestjs/testing';
import { ProblemRatingController } from './problem-rating.controller';
import { ProblemRatingService } from './problem-rating.service';
import { ProblemRatingRepository } from './repositories/problem-rating-repository.interface';
import { InMemoryProblemRatingRepository } from './repositories/in-memory-problem-rating.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../../data-source';
import { ProblemRating } from './entities/problem-rating.entity';

describe('ProblemRatingController', () => {
  let controller: ProblemRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(AppDataSource.options),
        TypeOrmModule.forFeature([ProblemRating]),
      ],
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
