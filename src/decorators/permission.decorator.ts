import { SetMetadata } from "@nestjs/common"
import { EnumPermission } from "src/enums/permission.enum"

export const RequiredPermission = (permission: EnumPermission) => {
    return SetMetadata('permission', permission)
}