import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TagRepository } from './repositories/tag-repository.interface';
import { InMemoryTagRepository } from './repositories/in-memory-tag.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../../data-source';
import { Tag } from './entities/tag.entity';

describe('TagController', () => {
  let controller: TagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(AppDataSource.options),
        TypeOrmModule.forFeature([Tag]),
      ],
      controllers: [TagController],
      providers: [
        TagService,
        {
          provide: TagRepository,
          useClass: InMemoryTagRepository,
        },
      ],
    }).compile();

    controller = module.get<TagController>(TagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
