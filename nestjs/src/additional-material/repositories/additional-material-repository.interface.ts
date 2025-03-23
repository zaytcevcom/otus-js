import { BaseRepository } from '../../common/repositories/base.repository';
import { AdditionalMaterial } from '../entities/additional-material.entity';

export abstract class AdditionalMaterialRepository extends BaseRepository<AdditionalMaterial> {
  abstract getAllByProblemId(problemId: number): Promise<AdditionalMaterial[]>;
}
