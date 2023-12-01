import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginParams } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { compareSync } from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from 'src/utils/jwt.utils';
import { pickProperties } from 'src/utils/pickProperties.utils';
import ResponseDatLogin from './dto/responseDataLogin.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ) { }

    /**
     * login
     * verify email and password
     * generate access token
     * generate refresh token
     * set cookie refresh token
     * add refresh token into black list
     * 
     */
    async verifyPassword(password: string, hashPassword: string) {
        return compareSync(password, hashPassword);
    }

    async login(account: LoginParams): Promise<ResponseDatLogin> {
        const {
            email,
            password
        } = account

        const foundUser = await this.userService.getUserByEmail(email)

        const verifyPassword = await this.verifyPassword(password, foundUser.password)

        console.log('verifyPassword', verifyPassword)

        if (!verifyPassword) throw new HttpException('Email or password is incorrect', HttpStatus.BAD_REQUEST)

        const user = pickProperties(
            foundUser,
            ['id', 'first_name', 'last_name', 'email']
        )

        const accessToken = await generateAccessToken(user)

        const refreshToken = await generateRefreshToken(user)

        console.log('accessToken', accessToken)

        return {
            user,
            accessToken,
            refreshToken
        }
    }
}

