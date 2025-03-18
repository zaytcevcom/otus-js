import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { AdditionalMaterial } from '../../additional-material/entities/additional-material.entity';

export class CreateProblemDto {
  @ApiProperty({
    example: 'JavaScript Counter',
    description: 'Name of problem',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'Given an integer n, return a counter function. This counter function initially returns n and then returns 1 more than the previous value every subsequent time it is called (n, n + 1, n + 2, etc).',
    description: 'Description of problem',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Input example',
    description: 'Description of input example',
  })
  @IsString()
  inputExample: string;

  @ApiProperty({
    example: 'Output example',
    description: 'Description of output example',
  })
  @IsString()
  outputExample: string;

  @ApiProperty({
    example: 'Medium',
    description: 'Difficulty',
  })
  @IsString()
  difficulty: 'Easy' | 'Medium' | 'Hard';

  @ApiProperty({
    example: ['JavaScript', 'TypeScript'],
    description: 'Tags',
  })
  tags: string[];

  @ApiProperty({
    example: [],
    description: 'Additional material',
  })
  additionalMaterials: AdditionalMaterial[];

  @ApiProperty({
    example: 5,
    description: 'Rating',
  })
  @IsNumber()
  rating: number;
}
