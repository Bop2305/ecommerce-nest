import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginParams } from './dto/login.dto';
import ResponseDatLogin from './dto/responseDataLogin.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post()
    async login(@Body() account: LoginParams, @Res({ passthrough: true }) res): Promise<Partial<ResponseDatLogin>> {
        const {
            user,
            accessToken,
            refreshToken
        } = await this.authService.login(account)

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true
        })

        return {
            user,
            accessToken
        }
    }
}
