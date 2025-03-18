import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateAdditionalMaterialDto } from './create-additional-material.dto';

export class UpdateAdditionalMaterialDto extends PartialType(
  OmitType(CreateAdditionalMaterialDto, ['problemId'] as const),
) {}
