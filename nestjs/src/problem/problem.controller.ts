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
import { ProblemService } from './problem.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/auth-user.decorator';
import { AuthUser } from '../auth/types/types';

@ApiTags('Problems')
@Controller('problems')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавление новой задачи' })
  @ApiResponse({
    status: 201,
    description: 'The problem has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(
    @Body() createProblemDto: CreateProblemDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.problemService.create(createProblemDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка задач' })
  @ApiResponse({ status: 200, description: 'Return all problems.' })
  getAll() {
    return this.problemService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получение информации о задаче по его идентификатору',
  })
  @ApiResponse({ status: 200, description: 'Return the problem.' })
  @ApiResponse({ status: 404, description: 'Problem not found.' })
  findById(@Param('id') id: string) {
    return this.problemService.findById(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Редактирование информации о задаче' })
  @ApiResponse({
    status: 200,
    description: 'The problem has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Problem not found.' })
  update(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto) {
    return this.problemService.update(+id, updateProblemDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление задачи' })
  @ApiResponse({
    status: 200,
    description: 'The problem has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Problem not found.' })
  remove(@Param('id') id: string) {
    return this.problemService.remove(+id);
  }
}
