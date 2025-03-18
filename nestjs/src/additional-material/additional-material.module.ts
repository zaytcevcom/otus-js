import { Module } from '@nestjs/common';
import { AdditionalMaterialService } from './additional-material.service';
import { AdditionalMaterialController } from './additional-material.controller';
import { InMemoryAdditionalMaterialRepository } from './repositories/in-memory-additional-material.repository';
import { AdditionalMaterialRepository } from './repositories/additional-material-repository.interface';

@Module({
  controllers: [AdditionalMaterialController],
  providers: [
    AdditionalMaterialService,
    {
      provide: AdditionalMaterialRepository,
      useClass: InMemoryAdditionalMaterialRepository,
    },
  ],
  exports: [AdditionalMaterialService, AdditionalMaterialRepository],
})
export class AdditionalMaterialModule {}
