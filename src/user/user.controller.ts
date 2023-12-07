import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import { JWTAuthenticationGuard } from 'src/auth/guards/jwtAuthentication.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatedSuccessResponse, OKSuccessResponse } from 'src/core/success.response';
import { Response } from 'express';
import { PaginationParams } from 'src/common/pagination.dto';

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
    async search(
        @Query('keySearch') keySearch: string,
        @Query() { order, page, perpage }: PaginationParams,
        @Res() res: Response
    ): Promise<Response> {
        const pagination = {
            order,
            page,
            perpage
        }

        const users = await this.userService.search(keySearch, pagination)

        return new OKSuccessResponse({
            metadata: {
                pagination,
                users
            }
        }).send(res)
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
