import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalMaterialController } from './additional-material.controller';
import { AdditionalMaterialService } from './additional-material.service';
import { AdditionalMaterialRepository } from './repositories/additional-material-repository.interface';
import { InMemoryAdditionalMaterialRepository } from './repositories/in-memory-additional-material.repository';

describe('AdditionalMaterialController', () => {
  let controller: AdditionalMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdditionalMaterialController],
      providers: [
        AdditionalMaterialService,
        {
          provide: AdditionalMaterialRepository,
          useClass: InMemoryAdditionalMaterialRepository,
        },
      ],
    }).compile();

    controller = module.get<AdditionalMaterialController>(
      AdditionalMaterialController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
