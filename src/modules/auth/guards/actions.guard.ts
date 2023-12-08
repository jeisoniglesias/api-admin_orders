import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ACTIONS_KEY } from '../decorators/actions.decorator';

@Injectable()
export class ActionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredActions = this.reflector.getAllAndOverride(ACTIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredActions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const UserRoles = user.roles;
    const UserPermissions = user.permissions;

    //console.log(UserRoles, UserPermissions);
    if (UserRoles.some((userRole) => userRole.name === 'admin')) {
      return true;
    }
    const hasPermission = requiredActions.some((action) => {
      return UserPermissions.some((permission) => permission.name === action);
    });
    const hasRolePermission = requiredActions.some((action) => {
      return UserRoles.some((role) => {
        return role.permissions.some(
          (permission) => permission.name === action,
        );
      });
    });
    const response = hasPermission || hasRolePermission;
    return response;
  }
}
