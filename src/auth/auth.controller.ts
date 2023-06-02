import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }
    
    @Post('/register')
    register(@Body() userDto: CreateUserDto) {
        return this.authService.register(userDto)
    }
}