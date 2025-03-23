import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { InMemoryTagRepository } from './repositories/in-memory-tag.repository';
import { TagRepository } from './repositories/tag-repository.interface';

describe('TagService', () => {
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: TagRepository,
          useClass: InMemoryTagRepository,
        },
      ],
    }).compile();

    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
