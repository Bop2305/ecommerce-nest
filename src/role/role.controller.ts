import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { UpdateRoleDto } from './dto/updateRole.dto';
import { CreateRoleDto } from './dto/createRole.dto';

@Controller('role')
export class RoleController {
    constructor(
        private readonly roleService: RoleService
    ) { }

    @Get()
    async findAll(): Promise<Role[]> {
        const roles = await this.roleService.findAll()
        if (!roles) throw new HttpException('Roles not found', HttpStatus.BAD_REQUEST)
        return roles
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Role> {
        const role = await this.roleService.findOne(id)
        if (!role) throw new HttpException('Role not found', HttpStatus.BAD_REQUEST)
        return role
    }

    @Post()
    async create(@Body() role: CreateRoleDto): Promise<Role> {
        const newRole = await this.roleService.create(role)
        if (!newRole) throw new HttpException('Create role failed', HttpStatus.BAD_REQUEST)
        return newRole
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() role: UpdateRoleDto): Promise<Role> {
        const modifiedRole = await this.roleService.update(id, role )
        if (!modifiedRole) throw new HttpException('Update role failed', HttpStatus.BAD_REQUEST)
        return modifiedRole
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.roleService.delete(id)
        return new HttpException('Delete role success', HttpStatus.OK)
    }
}

