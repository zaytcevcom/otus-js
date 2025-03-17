import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

interface User {
  roles?: string[];
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const request = context.switchToHttp().getRequest();
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    const user = request.user as User;

    return (
      Array.isArray(user?.roles) &&
      user.roles.some((role: string) => roles.includes(role))
    );
  }
}
