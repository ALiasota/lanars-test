import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './image.model';
import { FilesService } from 'src/files/files.service';
import { PortfoliosService } from 'src/portfolios/portfolios.service';
import { Portfolio } from 'src/portfolios/portfolio.model';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image) private imageRepository: typeof Image,
    @InjectModel(Portfolio) private portfolioRepository: typeof Portfolio,
    private fileService: FilesService,
    private portfolioService: PortfoliosService,
  ) {}

  async create(dto: CreateImageDto, file: any, userId: number) {
    const existedPortfolio =
      await this.portfolioService.getPortfolioByIdAndUserId(
        dto.portfolioId,
        userId,
      );
    if (!existedPortfolio)
      throw new HttpException(
        `You can't add image to this portfolio`,
        HttpStatus.FORBIDDEN,
      );
    const route = await this.fileService.createFile(file, dto.name);
    return await this.imageRepository.create({ ...dto, userId, route });
  }

  async deleteImage(imageId: number, userId: number) {
    const image = await this.getImageByIdAndUserId(imageId, userId);
    if (!image)
      throw new HttpException(`Image not found`, HttpStatus.NOT_FOUND);
    await this.fileService.deleteFile(image.route);
    await image.destroy();
    return image;
  }

  async getImageByIdAndUserId(imageId: number, userId: number) {
    return await this.imageRepository.findOne({
      where: { id: imageId, userId },
    });
  }

  async getAllImages() {
    return await this.imageRepository.findAll({
      include: {
        model: this.portfolioRepository,
        as: 'portfolio',
        attributes: ['name'],
      },
      order: [['createdAt', 'DESC']],
    });
  }
}
