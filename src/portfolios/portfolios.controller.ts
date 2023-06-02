import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { PortfoliosService } from './portfolios.service';

@Controller('portfolios')
export class PortfoliosController {
    constructor(private portfolioService: PortfoliosService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createPortfolio(@Body() dto: CreatePortfolioDto) {
        return this.portfolioService.create(dto)
    }
}
