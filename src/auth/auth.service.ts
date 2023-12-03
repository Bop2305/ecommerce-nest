import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginParams } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { compareSync } from "bcryptjs";
import { generateAccessToken, generateRefreshToken, verifyToken } from 'src/utils/jwt.utils';
import { pickProperties } from 'src/utils/pickProperties.utils';
import ResponseDatLogin from './dto/responseDataLogin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserToken } from './userToken.entity';
import { Repository } from 'typeorm';
import { cryptoHash } from 'src/utils/crypto.ultils';

@Injectable()
export class AuthService {
    private jwtSecretAccessToken = process.env.DEV_JWT_SECRET_ACCESS_TOKEN
    private jwtSecretRefreshToken = process.env.DEV_JWT_SECRET_REFRESH_TOKEN

    constructor(
        @InjectRepository(UserToken)
        private userTokenRepository: Repository<UserToken>,
        private userService: UserService
    ) { }

    /**
     * login
     * verify email and password
     * generate access token
     * generate refresh token
     * set cookie refresh token
     * save new refresh token in database
     * add old refresh token into black list
     * 
     */
    async verifyPassword(password: string, hashPassword: string) {
        return compareSync(password, hashPassword);
    }

    async getUserTokenByUserId(userId: string): Promise<UserToken> {
        const foundUserToken = await this.userTokenRepository.findOne({
            where: { user: { id: userId } },
            loadRelationIds: true
        })

        console.log('foundUserToken', foundUserToken);


        if (!foundUserToken) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)

        return foundUserToken
    }

    async createUserToken(userToken: Omit<UserToken, 'id' | 'created_at'>): Promise<UserToken> {
        const newUserToken = await this.userTokenRepository.create(userToken)

        if (!newUserToken) throw new HttpException('Create token failed', HttpStatus.BAD_REQUEST)

        return await this.userTokenRepository.save(newUserToken)
    }

    async login(account: LoginParams): Promise<ResponseDatLogin> {
        const {
            email,
            password
        } = account

        const foundUser = await this.userService.getUserByEmail(email)

        const verifyPassword = await this.verifyPassword(password, foundUser.password)

        if (!verifyPassword) throw new HttpException('Email or password is incorrect', HttpStatus.BAD_REQUEST)

        const user = pickProperties(
            foundUser,
            ['id', 'first_name', 'last_name', 'email']
        )

        const accessToken = await generateAccessToken(user)

        const refreshToken = await generateRefreshToken(user)

        const hashRefreshToken = await cryptoHash({ data: refreshToken, secret: this.jwtSecretRefreshToken })

        await this.createUserToken({
            hash_refresh_token: hashRefreshToken,
            user: foundUser
        })

        return {
            user,
            accessToken,
            refreshToken
        }
    }

    /**
     * refresh token
     * verify refresh token
     * generate access token
     */
    async refreshAccessToken(refreshToken: string): Promise<string> {
        const payload = await verifyToken(refreshToken, this.jwtSecretRefreshToken)

        const [foundUserToken, hashedRefreshToken] = await Promise.all([
            await this.getUserTokenByUserId(payload.id),
            await cryptoHash({ data: refreshToken, secret: this.jwtSecretRefreshToken })
        ])

        if (foundUserToken.hash_refresh_token !== hashedRefreshToken) {
            throw new HttpException('Authorization', HttpStatus.UNAUTHORIZED)
        }

        const user = pickProperties(
            payload,
            ['id', 'first_name', 'last_name', 'email']
        )

        const accessToken = await generateAccessToken(user)

        return accessToken

    }
}

