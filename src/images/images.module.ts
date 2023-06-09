import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Image } from './image.model';
import { Portfolio } from 'src/portfolios/portfolio.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';
import { Comment } from 'src/comments/comment.model';
import { User } from 'src/users/users.model';
import { PortfoliosModule } from 'src/portfolios/portfolios.module';

@Module({
  providers: [ImagesService],
  controllers: [ImagesController],
  imports: [
    SequelizeModule.forFeature([Portfolio, Image, Comment, User]),
    FilesModule,
    AuthModule,
    PortfoliosModule,
  ],
  exports: [ImagesService],
})
export class ImagesModule {}
