import { Role } from 'src/modules/manage/roles/entities/role.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Resp } from 'src/utils';

export const CurrentUser = createParamDecorator(
  (roles: Role[], context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw Resp.Error(
        'INTERNAL_SERVER_ERROR',
        'No user inside the request - make sure that we used the AuthGuard',
      );
    }

    if (!roles) return user;

    if (user.roles && user.roles.some((role) => roles.includes(role))) {
      return user;
    }

    throw Resp.Error('FORBIDDEN', `User ${user.username} is not a valid role`);
  },
);
