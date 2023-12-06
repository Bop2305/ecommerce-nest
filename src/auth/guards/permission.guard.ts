import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionService } from "src/permission/permission.service";

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private permissionService: PermissionService
    ) {}

    async canActivate(context: ExecutionContext) {
        const requiredPermission = this.reflector.getAllAndOverride('permission',[
            context.getHandler(),
            context.getClass()
        ])

        if(!requiredPermission) true

        const { role_id } = context.switchToHttp().getRequest()

        const permissions = await this.permissionService.findPermissionByRoleId(role_id)

        return permissions.some(permission => permission.permission_name == requiredPermission)
    }
}