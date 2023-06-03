import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { Portfolio } from './portfolios/portfolio.model';
import { Image } from './images/image.model';
import { Comment } from './comments/comment.model';
import { ImagesModule } from './images/images.module';
import { CommentsModule } from './comments/comments.module';
import * as path from 'path';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Portfolio, Image, Comment],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    PortfoliosModule,
    ImagesModule,
    CommentsModule,
    FilesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/auth/register', method: RequestMethod.POST },
        { path: 'api/auth/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
