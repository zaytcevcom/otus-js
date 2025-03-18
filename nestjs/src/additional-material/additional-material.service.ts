import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdditionalMaterialDto } from './dto/create-additional-material.dto';
import { UpdateAdditionalMaterialDto } from './dto/update-additional-material.dto';
import { AdditionalMaterialRepository } from './repositories/additional-material-repository.interface';

@Injectable()
export class AdditionalMaterialService {
  constructor(
    private readonly additionalMaterialRepository: AdditionalMaterialRepository,
  ) {}
  async create(createAdditionalMaterialDto: CreateAdditionalMaterialDto) {
    return await this.additionalMaterialRepository.create(
      createAdditionalMaterialDto,
    );
  }

  async getAllByProblemId(problemId: number) {
    return this.additionalMaterialRepository.getAllByProblemId(problemId);
  }

  async findById(id: number) {
    const material = await this.additionalMaterialRepository.findById(id);
    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }
    return material;
  }

  async update(
    id: number,
    updateAdditionalMaterialDto: UpdateAdditionalMaterialDto,
  ) {
    const material = await this.additionalMaterialRepository.update(
      id,
      updateAdditionalMaterialDto,
    );
    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }
    return material;
  }

  async remove(id: number) {
    await this.additionalMaterialRepository.remove(id);
  }
}
