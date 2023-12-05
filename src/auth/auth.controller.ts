import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginParams } from './dto/login.dto';
import { Response, Request } from 'express';
import { CreatedSuccessResponse, OKSuccessResponse } from 'src/core/success.response';
import { GoogleOAuthGuard } from './guards/googleOAuth.guard';
import { GoogleUser } from './dto/googleUser.dto';
import { JWTAuthenticationGuard } from './guards/jwtAuthentication.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RoleGuard } from './guards/role.guard';
import { EnumRole } from 'src/enums/role.enum';

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

        return new OKSuccessResponse({
            message: 'Login success',
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

    @Get('/google-redirect')
    @UseGuards(GoogleOAuthGuard)
    async googleRedirect(@Req() req: Request) {
        const param = req.user as GoogleUser
        const { user, accessToken } = await this.authService.googleLogin(param)

        return new OKSuccessResponse({
            message: 'Login success',
            metadata: {
                user,
                accessToken
            }
        })
    }

    @Get()
    @Roles(EnumRole.Admin)
    @UseGuards(JWTAuthenticationGuard, RoleGuard)
    async auth() {
        return new OKSuccessResponse({})
    }
}
