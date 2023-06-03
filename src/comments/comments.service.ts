import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    private imageService: ImagesService,
  ) {}

  async create(dto: CreateCommentDto, userId: number) {
    const existedImage = await this.imageService.getImageByIdAndUserId(
      dto.imageId,
      userId,
    );
    if (!existedImage)
      throw new HttpException(
        `You can't add comment to this image`,
        HttpStatus.FORBIDDEN,
      );
    return await this.commentRepository.create({ ...dto });
  }
}
