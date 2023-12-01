import { HttpException, HttpStatus } from '@nestjs/common'
import jwt from 'jsonwebtoken'
import { User } from 'src/user/user.entity'

export const generateAccessToken = async (payload: Partial<User>): Promise<string> => {
    const accessToken = jwt.sign(payload, process.env.DEV_JWT_SECRET_ACCESS_TOKEN, {
        expiresIn: process.env.DEV_JWT_EXPIRED_ACCESS_TOKEN
    })

    if(!accessToken) throw new HttpException('Generate token failed', HttpStatus.BAD_REQUEST)

    return accessToken
}

export const generateRefreshToken = async (payload: Partial<User>): Promise<string> => {
    const refreshToken = jwt.sign(payload, process.env.DEV_JWT_SECRET_REFRESH_TOKEN, {
        expiresIn: process.env.DEV_JWT_EXPIRED_REFRESH_TOKEN
    })

    if(!refreshToken) throw new HttpException('Generate token failed', HttpStatus.BAD_REQUEST)

    return refreshToken
}
