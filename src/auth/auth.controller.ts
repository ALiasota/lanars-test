import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    async login(@Body() userDto: CreateUserDto) {
        return await this.authService.login(userDto)
    }
    
    @Post('/register')
    async register(@Body() userDto: CreateUserDto) {
        return await this.authService.register(userDto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    logout() {
        return {token: ''}
    }
}
