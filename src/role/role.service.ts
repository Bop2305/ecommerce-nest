import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/createRole.dto';
import { UpdateRoleDto } from './dto/updateRole.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>
    ) { }

    async findAll(): Promise<Role[]> {
        return await this.roleRepository.find()
    }

    async findOne(id: string): Promise<Role> {
        return await this.roleRepository.findOne({ where: { id } })
    }

    async create(role: CreateRoleDto): Promise<Role> {
        const foundRole = await this.roleRepository.findOne({ where: { role_name: role.role_name } })

        if(foundRole) throw new HttpException('Role name already exists', HttpStatus.BAD_REQUEST)

        const newRole = await this.roleRepository.create(role)

        return this.roleRepository.save(newRole)
    }

    async update(id: string, role: UpdateRoleDto): Promise<Role> {
        await this.roleRepository.update(id, role)

        const modifiedRole = await this.roleRepository.findOne({ where: { id } })

        if (!modifiedRole) throw new HttpException('Role not found', HttpStatus.BAD_REQUEST)

        return modifiedRole
    }

    async delete(id: string) {
        const deletedRole = await this.roleRepository.delete(id)

        if (!deletedRole.affected) throw new HttpException('Role not found', HttpStatus.BAD_REQUEST)
    }
}
