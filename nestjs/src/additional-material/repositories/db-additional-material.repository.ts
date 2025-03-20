import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdditionalMaterialRepository } from './additional-material-repository.interface';
import { AdditionalMaterial } from '../entities/additional-material.entity';

@Injectable()
export class DbAdditionalMaterialRepository
  implements AdditionalMaterialRepository
{
  constructor(
    @InjectRepository(AdditionalMaterial)
    private readonly typeOrmRepository: Repository<AdditionalMaterial>,
  ) {}

  async create(data: Partial<AdditionalMaterial>): Promise<AdditionalMaterial> {
    const material = this.typeOrmRepository.create(data);
    return this.typeOrmRepository.save(material);
  }

  async getAll(): Promise<AdditionalMaterial[]> {
    return this.typeOrmRepository.find();
  }

  async getAllByProblemId(problemId: number): Promise<AdditionalMaterial[]> {
    return (await this.typeOrmRepository.find({ where: { problemId } })) || [];
  }

  async findById(id: number): Promise<AdditionalMaterial | null> {
    return this.typeOrmRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    data: Partial<AdditionalMaterial>,
  ): Promise<AdditionalMaterial> {
    await this.typeOrmRepository.update(id, data);
    const material = await this.typeOrmRepository.findOne({ where: { id } });
    if (!material) {
      throw new Error(`AdditionalMaterial with id ${id} not found`);
    }
    return material;
  }

  async remove(id: number): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }
}
