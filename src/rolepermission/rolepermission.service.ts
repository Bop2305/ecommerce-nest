import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RolePermission } from './rolepermission.entity';
import { CreateRolePermission } from './dto/createRolePermission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleService } from 'src/role/role.service';
import { PermissionService } from 'src/permission/permission.service';

@Injectable()
export class RolepermissionService {
    constructor(
        @InjectRepository(RolePermission)
        private rolepermissionRepository: Repository<RolePermission>,
        private roleService: RoleService,
        private permissionService: PermissionService
    ) {}

    async create(rolepermission: CreateRolePermission): Promise<RolePermission> {
        const {
            role_id,
            permission_id
        } = rolepermission

        const foundRole = await this.roleService.findOne(role_id)

        if(!foundRole) throw new HttpException('Role not found', HttpStatus.BAD_REQUEST)

        const foundPermission  = await this.permissionService.findOne(permission_id)

        if(!foundPermission) throw new HttpException('Permission not found', HttpStatus.BAD_REQUEST)

        const newRolePermission = await this.rolepermissionRepository.create({
            role: foundRole,
            permission: foundPermission
        })

        return this.rolepermissionRepository.save(newRolePermission);
    }
}
