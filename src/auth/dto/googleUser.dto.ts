import { User } from "src/user/user.entity";

export interface GoogleUser extends User{
    access_token: string
    refresh_token: string
    avatar_url: string
}