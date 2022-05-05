import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from '../decorator';
import { Role } from '../type';

@Injectable()
export class AccessJwtGuard extends AuthGuard('access-jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (roles?.includes(Role.PUBLIC)) return true;
    console.log('roles:', roles);

    return super.canActivate(context);
  }
}
