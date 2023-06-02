import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { Portfolio } from './portfolio.model';

@Injectable()
export class PortfoliosService {
    constructor(@InjectModel(Portfolio) private portfolioRepository: typeof Portfolio) {}

    async create(dto: CreatePortfolioDto) {
         return await this.portfolioRepository.create({ ...dto })
    }
}
