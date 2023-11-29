import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { RolepermissionService } from './rolepermission.service';
import { CreateRolePermission } from './dto/createRolePermission.dto';
import { RolePermission } from './rolepermission.entity';

@Controller('rolepermission')
export class RolepermissionController {
    constructor(
        private rolepermissionService: RolepermissionService
    ) { }

    @Post()
    async create(@Body() rolepermission: CreateRolePermission): Promise<RolePermission> {
        const createdRolePermission = await this.rolepermissionService.create(rolepermission)
        if (!createdRolePermission) throw new HttpException('Create rolepermission failed', HttpStatus.BAD_REQUEST)
        return createdRolePermission
    }
}
