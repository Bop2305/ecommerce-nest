import { IsNotEmpty, IsString } from "class-validator";

export class CreateRolePermission {
    @IsNotEmpty()
    @IsString()
    role_id: string

    @IsNotEmpty()
    @IsString()
    permission_id: string
}