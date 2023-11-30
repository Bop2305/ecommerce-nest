import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Post()
    async create(@Body() user: CreateUserDto): Promise<Partial<User>> {
        const newUser = this.userService.create(user)
        if (!newUser) throw new HttpException('Create user failed', HttpStatus.BAD_REQUEST)
        return newUser
    }

    @Get()
    async search(@Query('keySearch') keySearch: string): Promise<User[]> {
        const users = this.userService.search(keySearch)
        return users
    }
}
