import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
  ) {}

  async create(dto: CreateCommentDto) {
    return await this.commentRepository.create({ ...dto });
  }
}
