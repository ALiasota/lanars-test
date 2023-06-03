import {
  Controller,
  Get,
  Delete,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserDetails(@Req() req: Request) {
    const user = req['context'].user;
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return await this.userService.getUserById(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Req() req: Request) {
    const user = req['context'].user;
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    await this.userService.deleteUser(user.id);
    return 'User was deleted successfully';
  }
}
