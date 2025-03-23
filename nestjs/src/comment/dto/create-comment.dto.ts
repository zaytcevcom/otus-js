import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 1,
    description: 'ID of problem',
  })
  @IsNumber()
  problemId: number;

  @ApiProperty({
    example: 'My comment to this problem',
    description: 'Description of comment',
  })
  @IsString()
  content: string;
}
