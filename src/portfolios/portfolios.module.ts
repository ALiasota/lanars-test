import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import { PortfoliosController } from './portfolios.controller';
import { PortfoliosService } from './portfolios.service';
import {User} from "../users/users.model";
import { Portfolio } from './portfolio.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    providers: [PortfoliosService],
    controllers: [PortfoliosController],
    imports: [
        SequelizeModule.forFeature([User, Portfolio]),
        AuthModule
      ],
})
export class PortfoliosModule {}
