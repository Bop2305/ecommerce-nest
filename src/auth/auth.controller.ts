import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginParams } from './dto/login.dto';
import ResponseDatLogin from './dto/responseDataLogin.dto';
import { Response, Request } from 'express';
import { CreatedSuccessResponse } from 'src/core/success.response';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/login')
    async login(@Body() account: LoginParams, @Res({ passthrough: true }) res: Response): Promise<Response> {
        const {
            user,
            accessToken,
            refreshToken
        } = await this.authService.login(account)

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true
        })

        return new CreatedSuccessResponse({
            metadata: {
                user,
                accessToken
            }
        }).send(res)
    }

    @Post('/refresh-access-token')
    async refreshAccessToken(@Res() res: Response, @Req() req: Request): Promise<Response> {
        const refreshToken = req.cookies['refresh_token']

        const accessToken = await this.authService.refreshAccessToken(refreshToken)

        return new CreatedSuccessResponse({ metadata: { accessToken } }).send(res)
    }
}
