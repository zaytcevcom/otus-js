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
import { AdditionalMaterialService } from './additional-material.service';
import { CreateAdditionalMaterialDto } from './dto/create-additional-material.dto';
import { UpdateAdditionalMaterialDto } from './dto/update-additional-material.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Additional materials')
@Controller('additional-materials')
export class AdditionalMaterialController {
  constructor(
    private readonly additionalMaterialService: AdditionalMaterialService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавление доп материала к задаче' })
  @ApiResponse({
    status: 201,
    description: 'The problem material has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createAdditionalMaterialDto: CreateAdditionalMaterialDto) {
    return this.additionalMaterialService.create(createAdditionalMaterialDto);
  }

  @Get(':problemId')
  @ApiOperation({ summary: 'Получение списка доп материалов по задаче' })
  @ApiResponse({ status: 200, description: 'Return all materials.' })
  getAll(@Param('problemId') problemId: string) {
    return this.additionalMaterialService.getAllByProblemId(+problemId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получение информации о доп материале по его идентификатору',
  })
  @ApiResponse({ status: 200, description: 'Return the material.' })
  @ApiResponse({ status: 404, description: 'Material not found.' })
  findById(@Param('id') id: string) {
    return this.additionalMaterialService.findById(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Редактирование информации о доп материале' })
  @ApiResponse({
    status: 200,
    description: 'The material has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Material not found.' })
  update(
    @Param('id') id: string,
    @Body() updateAdditionalMaterialDto: UpdateAdditionalMaterialDto,
  ) {
    return this.additionalMaterialService.update(
      +id,
      updateAdditionalMaterialDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление доп материала' })
  @ApiResponse({
    status: 200,
    description: 'The material has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Material not found.' })
  remove(@Param('id') id: string) {
    return this.additionalMaterialService.remove(+id);
  }
}
