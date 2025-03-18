import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { ProblemRepository } from './repositories/problem-repository.interface';
import { InMemoryProblemRepository } from './repositories/in-memory-problem.repository';

@Module({
  controllers: [ProblemController],
  providers: [
    ProblemService,
    {
      provide: ProblemRepository,
      useClass: InMemoryProblemRepository,
    },
  ],
})
export class ProblemModule {}
