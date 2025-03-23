import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateProblemRatingDto {
  @ApiProperty({
    example: 1,
    description: 'ID of problem',
  })
  @IsNumber()
  problemId: number;

  @ApiProperty({
    example: 4,
    description: 'Rating',
  })
  @IsNumber()
  rating: number;
}
