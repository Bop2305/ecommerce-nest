import { HttpException, HttpStatus } from '@nestjs/common'
import jwt from 'jsonwebtoken'
import { User } from 'src/user/user.entity'

export const generateAccessToken = async (payload: Partial<User>): Promise<string> => {
    try {
        const accessToken = jwt.sign(payload, process.env.DEV_JWT_SECRET_ACCESS_TOKEN, {
            expiresIn: process.env.DEV_JWT_EXPIRED_ACCESS_TOKEN
        })

        return accessToken
    } catch (error) {
        throw new HttpException('Failed to generate access token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export const generateRefreshToken = async (payload: Partial<User>): Promise<string> => {
    try {
        const refreshToken = jwt.sign(payload, process.env.DEV_JWT_SECRET_REFRESH_TOKEN, {
            expiresIn: process.env.DEV_JWT_EXPIRED_REFRESH_TOKEN
        })
    
        return refreshToken
    } catch (error) {
        throw new HttpException('Failed to generate refresh token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export const verifyToken = async (token: string, secretToken: string ): Promise<jwt.JwtPayload & User > => {
    try {
        const jwtDecoded = jwt.verify(token, secretToken)

        return jwtDecoded as jwt.JwtPayload & User
    } catch (error) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
}