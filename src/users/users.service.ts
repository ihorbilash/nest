import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {

      constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

      async create(user: User) {
            return await this.userRepository.save(user);
      }

      async getUserByLogin(username: string) {
            const user = await this.userRepository.findOne({ where: { username }, relations: ['role'] });
            return user;
      }

      async findAllUsers() {
            return await this.userRepository.find({ relations: ['role'] })
      }
}
