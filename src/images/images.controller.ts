import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Req,
  HttpException,
  HttpStatus,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateImageDto } from './dto/create-image.dto';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createPortfolio(
    @Req() req: Request,
    @Body() dto: CreateImageDto,
    @UploadedFile() file,
  ) {
    const user = req['context'].user;
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return await this.imagesService.create(dto, file, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteImage(@Req() req: Request, @Param('id') id: string) {
    const user = req['context'].user;
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return await this.imagesService.deleteImage(Number(id), user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllImages(@Req() req: Request) {
    const user = req['context'].user;
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return await this.imagesService.getAllImages();
  }
}
