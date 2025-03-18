import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProblemModule } from './problem/problem.module';
import { AdditionalMaterialModule } from './additional-material/additional-material.module';
import { CommentModule } from './comment/comment.module';
import { ProblemRatingModule } from './problem-rating/problem-rating.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    ProblemModule,
    AdditionalMaterialModule,
    CommentModule,
    ProblemRatingModule,
    TagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
