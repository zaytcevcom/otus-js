import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { ProblemRepository } from './repositories/problem-repository.interface';

@Injectable()
export class ProblemService {
  constructor(private readonly problemRepository: ProblemRepository) {}

  async create(createProblemDto: CreateProblemDto, userId: number) {
    const problem = {
      ...createProblemDto,
      createdBy: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await this.problemRepository.create(problem);
  }

  async getAll() {
    return this.problemRepository.getAll();
  }

  async findById(id: number) {
    const problem = await this.problemRepository.findById(id);
    if (!problem) {
      throw new NotFoundException(`Problem with ID ${id} not found`);
    }
    return problem;
  }

  async update(id: number, updateProblemDto: UpdateProblemDto) {
    const problem = await this.problemRepository.update(id, updateProblemDto);
    if (!problem) {
      throw new NotFoundException(`Problem with ID ${id} not found`);
    }
    return problem;
  }

  async remove(id: number) {
    await this.problemRepository.remove(id);
  }
}
