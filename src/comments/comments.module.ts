import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentController } from './comments.controller';
import { CommentService } from './comments.service';
import { Comment } from './comment.model';
import { Image } from 'src/images/image.model';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { ImagesModule } from 'src/images/images.module';

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [
    SequelizeModule.forFeature([Comment, Image, User]),
    AuthModule,
    ImagesModule,
  ],
})
export class CommentsModule {}
