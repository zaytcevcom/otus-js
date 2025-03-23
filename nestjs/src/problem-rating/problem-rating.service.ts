import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProblemRatingDto } from './dto/create-problem-rating.dto';
import { UpdateProblemRatingDto } from './dto/update-problem-rating.dto';
import { ProblemRatingRepository } from './repositories/problem-rating-repository.interface';

@Injectable()
export class ProblemRatingService {
  constructor(
    private readonly problemRatingRepository: ProblemRatingRepository,
  ) {}
  async create(createProblemRatingDto: CreateProblemRatingDto, userId: number) {
    const rating = {
      ...createProblemRatingDto,
      userId: userId,
      createdAt: new Date(),
    };

    return await this.problemRatingRepository.create(rating);
  }

  async getAllByProblemId(problemId: number) {
    return this.problemRatingRepository.getAllByProblemId(problemId);
  }

  async findById(id: number) {
    const rating = await this.problemRatingRepository.findById(id);
    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }
    return rating;
  }

  async update(id: number, updateProblemRatingDto: UpdateProblemRatingDto) {
    const rating = await this.problemRatingRepository.update(
      id,
      updateProblemRatingDto,
    );
    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }
    return rating;
  }

  async remove(id: number) {
    await this.problemRatingRepository.remove(id);
  }
}
