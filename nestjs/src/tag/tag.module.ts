import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagRepository } from './repositories/tag-repository.interface';
import { InMemoryTagRepository } from './repositories/in-memory-tag.repository';

@Module({
  controllers: [TagController],
  providers: [
    TagService,
    {
      provide: TagRepository,
      useClass: InMemoryTagRepository,
    },
  ],
})
export class TagModule {}
