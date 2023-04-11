import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';
import { Roles } from './roles.enum';

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) { }

    /**
     * Хардкодом наливаємо в базу данних список дозволених користувачів
     */
    async createAvalibleRoles() {
        for (const el in Roles) {
            console.log(el)
            let role = new Role();
            role.name = el;
            await this.roleRepository.save(role)
        }

    }

    async findRole(name: string) {
        let role = await this.roleRepository.findOne({ where: { name } });
        if (role === null) {
            await this.createAvalibleRoles()
        }
        return await this.roleRepository.findOne({ where: { name } });
    }
}