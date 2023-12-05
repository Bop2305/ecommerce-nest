import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RoleService } from "src/role/role.service";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private roleService: RoleService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass()
        ]) as string[]

        if(!requiredRoles) true

        const { user } = context.switchToHttp().getRequest()

        const { role_name } = await this.roleService.findRoleByUserId(user?.id)

        return requiredRoles.includes(role_name)
    }
}