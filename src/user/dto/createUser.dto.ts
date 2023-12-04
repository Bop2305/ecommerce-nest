import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    first_name: string

    @IsNotEmpty()
    @IsString()
    last_name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsString()
    @IsOptional()
    gender?: string

    @IsDate()
    @IsOptional()
    birthday?: Date

    @IsString()
    @IsOptional()
    telephone?: string

    @IsString()
    @IsOptional()
    role_id?: string

    @IsBoolean()
    @IsOptional()
    is_register_by_google?: boolean
}