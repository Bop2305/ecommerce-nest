import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { CreatePermissionDto } from './dto/createPermission.dto';
import { UpdatePermissionDto } from './dto/updatePermission.dto';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>
    ) { }

    async findAll(): Promise<Permission[]> {
        return await this.permissionRepository.find()
    }

    async findOne(id: string): Promise<Permission> {
        return await this.permissionRepository.findOne({ where: { id } })
    }

    async create(permission: CreatePermissionDto): Promise<Permission> {
        const foundPermission = await this.permissionRepository.findOne({ where: { permission_name: permission.permission_name } })

        if(foundPermission) throw new HttpException('Permission name already exists', HttpStatus.BAD_REQUEST)

        const newPermission = await this.permissionRepository.create(permission)

        return this.permissionRepository.save(newPermission)
    }

    async update(id: string, permission: UpdatePermissionDto): Promise<Permission> {
        await this.permissionRepository.update(id, permission)

        const updatedPermission = await this.permissionRepository.findOne({ where: { id } })

        if (!updatedPermission) throw new HttpException('Permission not found', HttpStatus.BAD_REQUEST)

        return updatedPermission
    }

    async delete(id: string) {
        const deletedPermission = await this.permissionRepository.delete(id)

        if (!deletedPermission.affected) throw new HttpException('Permission not found', HttpStatus.BAD_REQUEST)
    }
}

