import { BaseRepository } from '../../common/repositories/base.repository';
import { Tag } from '../entities/tag.entity';

export abstract class TagRepository extends BaseRepository<Tag> {
  abstract findByName(name: string): Promise<Tag | null>;
}
