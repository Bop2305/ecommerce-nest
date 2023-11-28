import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateRoleDto } from './dto/createRole.dto';
import { UpdateRoleDto } from './dto/updateRole.dto';

/**
 * Mock dependency service
 * Mock data
 * Use beforeEach to create instance for each test case
 * Use createTestingModule để giả lập module của Nest
 * 
 */

describe('RoleService', () => {
  let roleService: RoleService;
  let roleRepository: Repository<Role>

  const roleStub: Role = {
    id: '643d0fb80a2f99f4151176c4',
    role_name: 'Admin',
    role_description: 'Role Admin',
    created_at: new Date(),
    modified_at: new Date()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        }
      ],
    }).compile();

    roleService = module.get<RoleService>(RoleService);
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role))
  });
  describe('Create role', () => {
    const createRoleStub: CreateRoleDto = {
      role_name: 'Admin',
      role_description: 'Role Admin',
    }

    it('should be defined', () => {
      expect(roleService).toBeDefined();
    });

    it('should throw a HttpException if role name already exists', async () => {
      jest.spyOn(roleRepository, 'findOne').mockResolvedValueOnce(roleStub)

      await expect(roleService.create(createRoleStub)).rejects.toThrow(
        new HttpException('Role name already exists', HttpStatus.BAD_REQUEST)
      )
    })

    it('should return a new role', async () => {
      jest.spyOn(roleRepository, 'findOne').mockResolvedValueOnce(null)
      jest.spyOn(roleRepository, 'create').mockReturnValueOnce(roleStub)
      jest.spyOn(roleRepository, 'save').mockResolvedValueOnce(roleStub)

      await expect(roleService.create(createRoleStub)).resolves.toBe(roleStub)
    })
  })

  describe('Update role', () => {
    const roleId = '5f11290c-4ce4-46db-b430-eb5cace0c8a4'

    const updateRole: UpdateRoleDto = {
      role_description: 'Role as Admin'
    }

    const updatedRoleStub: Role = {
      ...roleStub,
      role_description: updateRole.role_description
    }

    it('should throw a HttpException if role id does not exist', async () => {
      jest.spyOn(roleRepository, 'update').mockImplementationOnce(() => Promise.resolve({} as UpdateResult))
      jest.spyOn(roleRepository, 'findOne').mockResolvedValueOnce(null)

      await expect(roleService.update(roleId, updateRole)).rejects.toThrow(
        new HttpException('Role not found', HttpStatus.BAD_REQUEST)
      )
    })

    it('should return updated role', async () => {
      jest.spyOn(roleRepository, 'update').mockImplementationOnce(() => Promise.resolve({} as UpdateResult))
      jest.spyOn(roleRepository, 'findOne').mockResolvedValueOnce(updatedRoleStub)

      await expect(roleService.update(roleId, updateRole)).resolves.toBe(updatedRoleStub)
    })
  })
});
