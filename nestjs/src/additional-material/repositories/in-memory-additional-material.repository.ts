import { AdditionalMaterialRepository } from './additional-material-repository.interface';
import { AdditionalMaterial } from '../entities/additional-material.entity';

export class InMemoryAdditionalMaterialRepository
  implements AdditionalMaterialRepository
{
  private additionalMaterials: AdditionalMaterial[] = [];

  async create(data: Partial<AdditionalMaterial>): Promise<AdditionalMaterial> {
    const newAdditionalMaterial = {
      id: this.additionalMaterials.length + 1,
      ...data,
    } as AdditionalMaterial;
    this.additionalMaterials.push(newAdditionalMaterial);
    return Promise.resolve(newAdditionalMaterial);
  }

  async getAll(): Promise<AdditionalMaterial[]> {
    return Promise.resolve(this.additionalMaterials);
  }

  async getAllByProblemId(problemId: number): Promise<AdditionalMaterial[]> {
    return Promise.resolve(
      this.additionalMaterials.filter((u) => u.problemId === problemId),
    );
  }

  async findById(id: number): Promise<AdditionalMaterial | undefined> {
    return Promise.resolve(this.additionalMaterials.find((u) => u.id === id));
  }

  async update(
    id: number,
    data: Partial<AdditionalMaterial>,
  ): Promise<AdditionalMaterial> {
    const index = this.additionalMaterials.findIndex((u) => u.id === id);
    if (index === -1)
      throw Error(`AdditionalMaterial with id ${id} does not exist`);
    this.additionalMaterials[index] = {
      ...this.additionalMaterials[index],
      ...data,
    };
    return Promise.resolve(this.additionalMaterials[index]);
  }

  async remove(id: number): Promise<void> {
    const index = this.additionalMaterials.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.additionalMaterials.splice(index, 1);
    }
    return Promise.resolve();
  }
}
