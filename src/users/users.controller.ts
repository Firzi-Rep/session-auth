import { Body, Controller, Post, Request, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // post / signup

    @Post('/signup')
    async addUser(
        @Body('password') userPassword: string,
        @Body('username') userName: string,
    ) {
        const saltOrRounds = 10;
        const hashedpassword = await bcrypt.hash(userPassword, saltOrRounds);
        const result = await this.usersService.insertUser(
            userName,
            hashedpassword,
        );
        return {
            msg: 'User Successfully Registered',
            userId: result.id,
            userName: result.username,
        };
    }
    // post / login
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() req): any {
        return {user: req.user,
        msg: 'User logged in successfully'};
    }

    //Get / Protected 
    @UseGuards(AuthenticatedGuard)
    @Get('/protected')
    getHello(@Request() req): String {
        return req.user;
    }
    
}
