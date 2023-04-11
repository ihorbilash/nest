import { Role } from "src/roles/roles.entity"

export class AuthUserDto {
    username: string
    role: Role
}