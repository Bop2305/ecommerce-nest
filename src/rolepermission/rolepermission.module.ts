import { Module } from '@nestjs/common';
import { RolepermissionController } from './rolepermission.controller';
import { RolepermissionService } from './rolepermission.service';
import { RoleModule } from 'src/role/role.module';
import { PermissionModule } from 'src/permission/permission.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from './rolepermission.entity';

@Module({
  controllers: [RolepermissionController],
  providers: [RolepermissionService],
  imports: [
    TypeOrmModule.forFeature([RolePermission]),
    RoleModule,
    PermissionModule
  ]
})
export class RolepermissionModule { }
