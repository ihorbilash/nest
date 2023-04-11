import { ApiProperty } from "@nestjs/swagger";
import { Roles } from "src/roles/roles.enum";

export class RegisterUserDto {
    @ApiProperty({ example: 'ihor', description: "login" })
    username: string;
    @ApiProperty({ example: '******', description: "password" })
    password: string;
    @ApiProperty({ example: 'admin/user', description: "users role", enum: Roles })
    role: Roles
}