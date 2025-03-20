import { Test, TestingModule } from '@nestjs/testing';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';
import { ProblemRepository } from './repositories/problem-repository.interface';
import { InMemoryProblemRepository } from './repositories/in-memory-problem.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../../data-source';
import { Problem } from './entities/problem.entity';

describe('ProblemController', () => {
  let controller: ProblemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(AppDataSource.options),
        TypeOrmModule.forFeature([Problem]),
      ],
      controllers: [ProblemController],
      providers: [
        ProblemService,
        {
          provide: ProblemRepository,
          useClass: InMemoryProblemRepository,
        },
      ],
    }).compile();

    controller = module.get<ProblemController>(ProblemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
