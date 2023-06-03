import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { PortfoliosService } from './portfolios.service';

@Controller('portfolios')
export class PortfoliosController {
  constructor(private portfolioService: PortfoliosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPortfolio(@Req() req: Request, @Body() dto: CreatePortfolioDto) {
    const user = req['context'].user;
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return await this.portfolioService.create(dto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getPortfolio(@Req() req: Request, @Param('id') id: string) {
    const user = req['context'].user;
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    const portfolio = await this.portfolioService.getPortfolioByIdAndUserId(
      Number(id),
      user.id,
    );
    console.log(portfolio);
    if (!portfolio)
      throw new HttpException('Portfolio not found', HttpStatus.NOT_FOUND);
    return portfolio;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletePortfolio(@Req() req: Request, @Param('id') id: string) {
    const user = req['context'].user;
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return await this.portfolioService.deletePortfolio(Number(id), user.id);
  }
}
