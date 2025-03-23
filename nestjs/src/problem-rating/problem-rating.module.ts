import { Module } from '@nestjs/common';
import { ProblemRatingService } from './problem-rating.service';
import { ProblemRatingController } from './problem-rating.controller';
import { ProblemRatingRepository } from './repositories/problem-rating-repository.interface';
import { DbProblemRatingRepository } from './repositories/db-problem-rating.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemRating } from './entities/problem-rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProblemRating])],
  controllers: [ProblemRatingController],
  providers: [
    ProblemRatingService,
    {
      provide: ProblemRatingRepository,
      useClass: DbProblemRatingRepository,
    },
  ],
})
export class ProblemRatingModule {}
