import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';
import { CreatePermissionDto } from './dto/createPermission.dto';
import { UpdatePermissionDto } from './dto/updatePermission.dto';

describe('PermissionService', () => {
  let permissionService: PermissionService;
  let permissionRepository: Repository<Permission>

  const permissionStub: Permission = {
    id: '643d0fb80a2f99f4151176c4',
    permission_name: 'Select',
    permission_description: 'Only Read Document',
    created_at: new Date(),
    modified_at: new Date()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        {
          provide: getRepositoryToken(Permission),
          useClass: Repository,
        }
      ],
    }).compile();

    permissionService = module.get<PermissionService>(PermissionService);
    permissionRepository = module.get<Repository<Permission>>(getRepositoryToken(Permission))
  });
  describe('Create permission', () => {
    const createPermission: CreatePermissionDto = {
      permission_name: 'Select',
      permission_description: 'Only Read Document',
    }

    it('should be defined', () => {
      expect(permissionService).toBeDefined();
    });

    it('should throw a HttpException if permission name already exists', async () => {
      jest.spyOn(permissionRepository, 'findOne').mockResolvedValueOnce(permissionStub)

      await expect(permissionService.create(createPermission)).rejects.toThrow(
        new HttpException('Permission name already exists', HttpStatus.BAD_REQUEST)
      )
    })

    it('should return a new permission', async () => {
      jest.spyOn(permissionRepository, 'findOne').mockResolvedValueOnce(null)
      jest.spyOn(permissionRepository, 'create').mockReturnValueOnce(permissionStub)
      jest.spyOn(permissionRepository, 'save').mockResolvedValueOnce(permissionStub)

      await expect(permissionService.create(createPermission)).resolves.toBe(permissionStub)
    })
  })

  describe('Update permission', () => {
    const permissionId = '5f11290c-4ce4-46db-b430-eb5cace0c8a4'

    const updatePermission: UpdatePermissionDto = {
      permission_description: 'Only Read'
    }

    const updatedPermissionStub: Permission = {
      ...permissionStub,
      permission_description: updatePermission.permission_description
    }

    it('should throw a HttpException if permission id does not exist', async () => {
      jest.spyOn(permissionRepository, 'update').mockImplementationOnce(() => Promise.resolve({} as UpdateResult))
      jest.spyOn(permissionRepository, 'findOne').mockResolvedValueOnce(null)

      await expect(permissionService.update(permissionId, updatePermission)).rejects.toThrow(
        new HttpException('Permission not found', HttpStatus.BAD_REQUEST)
      )
    })

    it('should return updated permission', async () => {
      jest.spyOn(permissionRepository, 'update').mockImplementationOnce(() => Promise.resolve({} as UpdateResult))
      jest.spyOn(permissionRepository, 'findOne').mockResolvedValueOnce(updatedPermissionStub)

      await expect(permissionService.update(permissionId, updatePermission)).resolves.toBe(updatedPermissionStub)
    })
  })
});
