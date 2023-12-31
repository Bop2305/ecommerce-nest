import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserToken } from './userToken.entity';
import { GoogleStrategy } from './strategies/google.strategy';
import { RoleModule } from 'src/role/role.module';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  imports: [
    TypeOrmModule.forFeature([UserToken]),
    UserModule,
    RoleModule,
    PermissionModule
  ]
})
export class AuthModule { }
