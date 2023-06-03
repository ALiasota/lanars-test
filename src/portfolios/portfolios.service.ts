import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { Portfolio } from './portfolio.model';

@Injectable()
export class PortfoliosService {
    constructor(@InjectModel(Portfolio) private portfolioRepository: typeof Portfolio) {}

    async create(dto: CreatePortfolioDto, userId: number) {
        const existedPortfolio = await this.getPortfolioByUserIdAndName(dto.name, userId)
        if (existedPortfolio) throw new HttpException(`Portfolio: ${dto.name} already exist`, HttpStatus.BAD_REQUEST)
        return await this.portfolioRepository.create({ ...dto, userId })
    }

    async getPortfolioByUserIdAndName(name: string, userId: number) {
        return await this.portfolioRepository.findOne({ where: { name, userId } })
    }

    async getPortfolioByIdAndUserId(portfolioId: number, userId: number) {
        return await this.portfolioRepository.findOne({ where: { id: portfolioId, userId }, include: { all: true } })
    }

    async deletePortfolio(portfolioId: number, userId: number) {
        const existedPortfolio = await this.getPortfolioByIdAndUserId(portfolioId, userId)
        if (!existedPortfolio) throw new HttpException(`You have no access to delete this portfolio`, HttpStatus.FORBIDDEN)
        await existedPortfolio.destroy()
        return existedPortfolio
    }
}
