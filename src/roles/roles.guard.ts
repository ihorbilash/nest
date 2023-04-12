import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { AuthUserDto } from "src/auth/dto/auth-user.dto";
import { ROLES_KEY } from "./roles-decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private jwtService: JwtService
  ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1]
    if (token) {
      let user = this.jwtService.decode(token) as AuthUserDto;
      return requiredRoles.some((role) => user.role.name?.includes(role));
    }
  }
}