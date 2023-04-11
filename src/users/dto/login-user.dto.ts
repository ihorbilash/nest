import { ApiProperty } from "@nestjs/swagger";



export class LoginUserDto {
    @ApiProperty({ example: 'ihor', description: "login" })
    username: string;
    @ApiProperty({ example: '12345dkmcd', description: "password" })
    password: string;
}