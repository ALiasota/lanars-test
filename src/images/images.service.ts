import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './image.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ImagesService {
    constructor(@InjectModel(Image) private imageRepository: typeof Image, private fileService: FilesService) {}

    async create(dto: CreateImageDto, file: any) {
        console.log(dto)
        await this.fileService.createFile(file, dto.name)
        return await this.imageRepository.create({ ...dto })
    }
}
