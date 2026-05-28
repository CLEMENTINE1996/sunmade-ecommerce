import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true; // Route isn't restricted by role

    const request = context.switchToHttp().getRequest();
    const user = request['user']; // Populated by AuthGuard

    // Check if at least one of the user's database roles matches the route requirements
    const hasRole = user?.roles?.some((role: string) => requiredRoles.includes(role));
    
    if (!hasRole) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }
    
    return true;
  }
}