import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProblemRatingService } from './problem-rating.service';
import { CreateProblemRatingDto } from './dto/create-problem-rating.dto';
import { UpdateProblemRatingDto } from './dto/update-problem-rating.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/auth-user.decorator';
import { AuthUser } from '../auth/types/types';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Problem ratings')
@Controller('problem-ratings')
export class ProblemRatingController {
  constructor(private readonly problemRatingService: ProblemRatingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Оценка задачи' })
  @ApiResponse({
    status: 201,
    description: 'The problem rating has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(
    @Body() createProblemRatingDto: CreateProblemRatingDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.problemRatingService.create(createProblemRatingDto, user.id);
  }

  @Get(':problemId')
  @ApiOperation({ summary: 'Получение списка оценок по задаче' })
  @ApiResponse({ status: 200, description: 'Return all ratings.' })
  getAll(@Param('problemId') problemId: string) {
    return this.problemRatingService.getAllByProblemId(+problemId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получение информации об оценке по её идентификатору',
  })
  @ApiResponse({ status: 200, description: 'Return the rating.' })
  @ApiResponse({ status: 404, description: 'Ratings not found.' })
  findById(@Param('id') id: string) {
    return this.problemRatingService.findById(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Редактирование информации об оценке' })
  @ApiResponse({
    status: 200,
    description: 'The rating has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Rating not found.' })
  update(
    @Param('id') id: string,
    @Body() updateProblemRatingDto: UpdateProblemRatingDto,
  ) {
    return this.problemRatingService.update(+id, updateProblemRatingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление оценки' })
  @ApiResponse({
    status: 200,
    description: 'The rating has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Rating not found.' })
  remove(@Param('id') id: string) {
    return this.problemRatingService.remove(+id);
  }
}
