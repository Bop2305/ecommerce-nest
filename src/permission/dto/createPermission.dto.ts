import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePermissionDto {
    @IsString()
    @IsNotEmpty()
    permission_name: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    permission_description?: string
}