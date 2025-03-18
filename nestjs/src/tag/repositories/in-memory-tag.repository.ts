import { TagRepository } from './tag-repository.interface';
import { Tag } from '../entities/tag.entity';

export class InMemoryTagRepository implements TagRepository {
  private tags: Tag[] = [];

  async create(data: Partial<Tag>): Promise<Tag> {
    const newTag = { id: this.tags.length + 1, ...data } as Tag;
    this.tags.push(newTag);
    return Promise.resolve(newTag);
  }

  async getAll(): Promise<Tag[]> {
    return Promise.resolve(this.tags);
  }

  async findById(id: number): Promise<Tag | undefined> {
    return Promise.resolve(this.tags.find((u) => u.id === id));
  }

  async findByName(name: string): Promise<Tag | undefined> {
    return Promise.resolve(this.tags.find((u) => u.name === name));
  }

  async update(id: number, data: Partial<Tag>): Promise<Tag> {
    const index = this.tags.findIndex((u) => u.id === id);
    if (index === -1) throw Error(`Tag with id ${id} does not exist`);
    this.tags[index] = { ...this.tags[index], ...data };
    return Promise.resolve(this.tags[index]);
  }

  async remove(id: number): Promise<void> {
    const index = this.tags.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.tags.splice(index, 1);
    }
    return Promise.resolve();
  }
}
