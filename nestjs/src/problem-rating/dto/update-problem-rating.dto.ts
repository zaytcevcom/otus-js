import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateProblemRatingDto } from './create-problem-rating.dto';

export class UpdateProblemRatingDto extends PartialType(
  OmitType(CreateProblemRatingDto, ['problemId'] as const),
) {}
