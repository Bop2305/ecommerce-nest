import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { Injectable } from "@nestjs/common";
import { Profile } from 'passport';
import { GoogleUser } from '../dto/googleUser.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            scope: ['email', 'profile'],
            callbackURL: 'http://localhost:8080/auth/google-redirect'
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
    ) {
        const {
            name,
            emails,
            photos
        } = profile

        const user = {
            email: emails[0].value,
            first_name: name.givenName,
            last_name: name.familyName,
            google_avatar: photos[0].value,
            access_token: accessToken,
            refresh_token: refreshToken,
        } as GoogleUser

        done(null, user);
    }
}