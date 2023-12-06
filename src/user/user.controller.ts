import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import { JWTAuthenticationGuard } from 'src/auth/guards/jwtAuthentication.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatedSuccessResponse } from 'src/core/success.response';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

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


    @Post('/avatar')
    @UseGuards(JWTAuthenticationGuard)
    @UseInterceptors(FileInterceptor('file'))
    async addAvatar(@Req() req: Request, @Res() res: Response, @UploadedFile() file: Express.Multer.File) {
        const user = req['user']  
        const avatar = await this.userService.addAvatar(user?.id, file.buffer, file.originalname)

        return new CreatedSuccessResponse({ 
            message: 'Update avatar success',
            metadata: { avatar }
        }).send(res)
    }
}
