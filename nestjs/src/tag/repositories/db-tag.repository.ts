import { TagRepository } from './tag-repository.interface';
import { Tag } from '../entities/tag.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DbTagRepository implements TagRepository {
  constructor(
    @InjectRepository(Tag)
    private readonly typeOrmRepository: Repository<Tag>,
  ) {}

  async create(data: Partial<Tag>): Promise<Tag> {
    const tag = this.typeOrmRepository.create(data);
    return this.typeOrmRepository.save(tag);
  }

  async getAll(): Promise<Tag[]> {
    return this.typeOrmRepository.find();
  }

  async findById(id: number): Promise<Tag | null> {
    return this.typeOrmRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Tag | null> {
    return this.typeOrmRepository.findOne({ where: { name } });
  }

  async update(id: number, data: Partial<Tag>): Promise<Tag> {
    await this.typeOrmRepository.update(id, data);
    const tag = await this.typeOrmRepository.findOne({ where: { id } });
    if (!tag) {
      throw new Error(`Tag with id ${id} not found`);
    }
    return tag;
  }

  async remove(id: number): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }
}
