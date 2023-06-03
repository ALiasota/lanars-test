import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comments.service';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPortfolio(@Req() req: Request, @Body() dto: CreateCommentDto) {
    const user = req['context'].user;
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return await this.commentService.create(dto, user.id);
  }
}
