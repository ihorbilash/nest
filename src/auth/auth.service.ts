import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthUserDto } from './dto/auth-user.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { RolesService } from 'src/roles/roles.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';


const SALT = 5;

@Injectable()
export class AuthService {


    constructor(private usersService: UsersService,
        private jwtService: JwtService,
        private roleService: RolesService
    ) { }


    async login(loginUserDto: LoginUserDto) {
        const potential_user = await this.usersService.getUserByLogin(loginUserDto.username);
        if (!potential_user) throw new BadRequestException('User is not exists');
        const isPasswordCorrect = await bcrypt.compare(loginUserDto.password, potential_user.hash_password);
        if (!isPasswordCorrect) throw new BadRequestException('Password incorrect');
        const token = await this.generateToken(potential_user);
        return  token  
    }


    async registration(registerUserDto: RegisterUserDto) {
        const potential_user = await this.usersService.getUserByLogin(registerUserDto.username);
        if (potential_user) throw new BadRequestException('User is already exists');
        const hash_password = await bcrypt.hash(registerUserDto.password, SALT);
        //---------
        let new_user = new User();
        new_user.username = registerUserDto.username;
        new_user.hash_password = hash_password;
        console.log('new role user=>', registerUserDto.role)
        const role = await this.roleService.findRole(registerUserDto.role);  
        new_user.role = role;
        //-----
        await this.usersService.create(new_user);
        return { ok: true }
    }

    async generateToken(user: User) {
        const payload:AuthUserDto = { username: user.username, role: user.role }
        return { token: this.jwtService.sign(payload) }
    }



}
