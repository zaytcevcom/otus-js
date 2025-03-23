import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalMaterialController } from './additional-material.controller';
import { AdditionalMaterialService } from './additional-material.service';
import { AdditionalMaterialRepository } from './repositories/additional-material-repository.interface';
import { InMemoryAdditionalMaterialRepository } from './repositories/in-memory-additional-material.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../../data-source';
import { AdditionalMaterial } from './entities/additional-material.entity';

describe('AdditionalMaterialController', () => {
  let controller: AdditionalMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(AppDataSource.options),
        TypeOrmModule.forFeature([AdditionalMaterial]),
      ],
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
