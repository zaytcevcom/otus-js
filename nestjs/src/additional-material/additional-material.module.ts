import { Module } from '@nestjs/common';
import { AdditionalMaterialService } from './additional-material.service';
import { AdditionalMaterialController } from './additional-material.controller';
import { AdditionalMaterialRepository } from './repositories/additional-material-repository.interface';
import { DbAdditionalMaterialRepository } from './repositories/db-additional-material.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalMaterial } from './entities/additional-material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdditionalMaterial])],
  controllers: [AdditionalMaterialController],
  providers: [
    AdditionalMaterialService,
    {
      provide: AdditionalMaterialRepository,
      useClass: DbAdditionalMaterialRepository,
    },
  ],
  exports: [AdditionalMaterialService, AdditionalMaterialRepository],
})
export class AdditionalMaterialModule {}
