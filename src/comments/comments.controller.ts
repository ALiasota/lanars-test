import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comments.service';

@Controller('comments')
export class CommentController {
    constructor(private commentService: CommentService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPortfolio(@Body() dto: CreateCommentDto) {
        return await this.commentService.create(dto)
    }
}
