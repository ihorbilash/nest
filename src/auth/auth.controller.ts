import { Body, Controller, Post, UseGuards,Request } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "src/users/dto/login-user.dto";
import { RegisterUserDto } from "src/users/dto/register-user.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@ApiTags('registration/authorization')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @ApiBody({type:LoginUserDto}) 
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return req.user;
  }

  @Post('registration')
  registration(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registration(registerUserDto);
  }


}