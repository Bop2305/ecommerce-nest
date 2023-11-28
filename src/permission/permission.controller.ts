import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/createPermission.dto';
import { UpdatePermissionDto } from './dto/updatePermission.dto';

@Controller('permission')
export class PermissionController {
    constructor(
        private readonly permissionService: PermissionService
    ) { }

    @Get()
    async findAll(): Promise<Permission[]> {
        const permissions = await this.permissionService.findAll()
        if (!permissions) throw new HttpException('Permissions not found', HttpStatus.BAD_REQUEST)
        return permissions
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Permission> {
        const permission = await this.permissionService.findOne(id)
        if (!permission) throw new HttpException('Permission not found', HttpStatus.BAD_REQUEST)
        return permission
    }

    @Post()
    async create(@Body() permission: CreatePermissionDto): Promise<Permission> {
        const newPermission = await this.permissionService.create(permission)
        if (!newPermission) throw new HttpException('Create permission failed', HttpStatus.BAD_REQUEST)
        return newPermission
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() permission: UpdatePermissionDto): Promise<Permission> {
        const modifiedPermission = await this.permissionService.update(id, permission)
        if (!modifiedPermission) throw new HttpException('Update permission failed', HttpStatus.BAD_REQUEST)
        return modifiedPermission
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.permissionService.delete(id)
        return new HttpException('Delete permission success', HttpStatus.OK)
    }
}
