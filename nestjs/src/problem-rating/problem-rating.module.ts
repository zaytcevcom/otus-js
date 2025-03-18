import { Module } from '@nestjs/common';
import { ProblemRatingService } from './problem-rating.service';
import { ProblemRatingController } from './problem-rating.controller';
import { InMemoryProblemRatingRepository } from './repositories/in-memory-problem-rating.repository';
import { ProblemRatingRepository } from './repositories/problem-rating-repository.interface';

@Module({
  controllers: [ProblemRatingController],
  providers: [
    ProblemRatingService,
    {
      provide: ProblemRatingRepository,
      useClass: InMemoryProblemRatingRepository,
    },
  ],
})
export class ProblemRatingModule {}
