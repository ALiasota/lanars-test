import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Comment } from 'src/comments/comment.model';
import { Image } from 'src/images/image.model';
import { Portfolio } from 'src/portfolios/portfolio.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, Portfolio, Image, Comment]),
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
