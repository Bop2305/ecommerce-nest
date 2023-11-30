import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { RoleService } from 'src/role/role.service';
import { omitProperties } from 'src/ultils/omitProperties';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private roleService: RoleService
    ) {}

    async create(user: CreateUserDto): Promise<Partial<User>> {
        const {
            email,
            role_id
        } = user

        const foundUser = await this.userRepository.findOne({where: {email}})

        if(foundUser) throw new HttpException('Email has already exits', HttpStatus.BAD_REQUEST)

        const foundRole = await this.roleService.findOne(role_id)

        if(!foundRole) throw new HttpException('Role not found', HttpStatus.BAD_REQUEST)
        
        const newUser = await this.userRepository.create(user)

        const createdUser = await this.userRepository.save(newUser)

        return omitProperties<User, 'password'>(createdUser, ['password'])
    }

    async search(keySearch): Promise<User[]> {
        const result = await this.userRepository
        .createQueryBuilder('user')
        .select([
            'user.id',
            'user.first_name',
            'user.last_name',
            'user.email',
            'user.gender',
            'user.telephone'
        ])
        .where('email ILIKE :keySearch', {keySearch: `%${keySearch}%`})
        .orWhere('first_name ILIKE :keySearch', {keySearch: `%${keySearch}%`})
        .orWhere('last_name ILIKE :keySearch', {keySearch: `%${keySearch}%`})
        .getMany()

        return result
    }
}