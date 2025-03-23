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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CurrentUser } from '../common/decorators/auth-user.decorator';
import { AuthUser } from '../auth/types/types';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавление нового комментария' })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.commentService.create(createCommentDto, user.id);
  }

  @Get(':problemId')
  @ApiOperation({ summary: 'Получение списка комментариев по задаче' })
  @ApiResponse({ status: 200, description: 'Return all comments.' })
  getAll(@Param('problemId') problemId: string) {
    return this.commentService.getAllByProblemId(+problemId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получение информации о комментарии по его идентификатору',
  })
  @ApiResponse({ status: 200, description: 'Return the comment.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  findById(@Param('id') id: string) {
    return this.commentService.findById(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Редактирование информации о комментарии' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление комментария' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
