import { SetMetadata } from "@nestjs/common";
import { EnumRole } from "src/enums/role.enum";

export const Roles = (...roles: EnumRole[]) => {
    return SetMetadata('roles', roles)
}