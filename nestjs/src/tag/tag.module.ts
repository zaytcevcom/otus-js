import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagRepository } from './repositories/tag-repository.interface';
import { DbTagRepository } from './repositories/db-tag.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [
    TagService,
    {
      provide: TagRepository,
      useClass: DbTagRepository,
    },
  ],
})
export class TagModule {}
