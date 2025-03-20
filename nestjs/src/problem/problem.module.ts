import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { ProblemRepository } from './repositories/problem-repository.interface';
import { DbProblemRepository } from './repositories/db-problem.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Problem])],
  controllers: [ProblemController],
  providers: [
    ProblemService,
    {
      provide: ProblemRepository,
      useClass: DbProblemRepository,
    },
  ],
})
export class ProblemModule {}
