import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepository } from './repositories/tag-repository.interface';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async create(createTagDto: CreateTagDto) {
    const tag = await this.tagRepository.findByName(createTagDto.name);

    if (tag) {
      throw new BadRequestException('Tag already exists');
    }

    return await this.tagRepository.create(createTagDto);
  }

  async getAll() {
    return this.tagRepository.getAll();
  }

  async findById(id: number) {
    const tag = await this.tagRepository.findById(id);
    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.tagRepository.update(id, updateTagDto);
    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
    return tag;
  }

  async remove(id: number) {
    await this.tagRepository.remove(id);
  }
}
