import { Controller, Post, Body, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateImageDto } from './dto/create-image.dto';
import { ImagesService } from './images.service';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('images')
export class ImagesController {
    constructor(private imagesService: ImagesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    createPortfolio(@Body() dto: CreateImageDto, @UploadedFile() file) {
        return this.imagesService.create(dto, file)
    }
}
