import { Test, TestingModule } from '@nestjs/testing';
import { ProblemService } from './problem.service';
import { ProblemRepository } from './repositories/problem-repository.interface';
import { InMemoryProblemRepository } from './repositories/in-memory-problem.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../../data-source';
import { Problem } from './entities/problem.entity';

describe('ProblemService', () => {
  let service: ProblemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(AppDataSource.options),
        TypeOrmModule.forFeature([Problem]),
      ],
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
