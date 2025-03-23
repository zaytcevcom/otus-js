import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateAdditionalMaterialDto {
  @ApiProperty({
    example: 1,
    description: 'ID of problem',
  })
  @IsNumber()
  problemId: number;

  @ApiProperty({
    example: 'https://example.com/test',
    description: 'type',
  })
  @IsString()
  type: 'file' | 'link';

  @ApiProperty({
    example: 'Additional material',
    description: 'content',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: 'Additional material description',
    description: 'description',
  })
  @IsString()
  description: string;
}
