import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalMaterialService } from './additional-material.service';
import { AdditionalMaterialRepository } from './repositories/additional-material-repository.interface';
import { InMemoryAdditionalMaterialRepository } from './repositories/in-memory-additional-material.repository';

describe('AdditionalMaterialService', () => {
  let service: AdditionalMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdditionalMaterialService,
        {
          provide: AdditionalMaterialRepository,
          useClass: InMemoryAdditionalMaterialRepository,
        },
      ],
    }).compile();

    service = module.get<AdditionalMaterialService>(AdditionalMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
