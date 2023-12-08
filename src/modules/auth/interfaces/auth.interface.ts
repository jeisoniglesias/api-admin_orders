import { PermissionEntity } from 'src/modules/manage/permissions/entities/permission.entity';
import { Role } from 'src/modules/manage/roles/entities/role.entity';

export interface IPayloadToken {
  id: number;
  roles: Role[];
  permissions?: PermissionEntity[];
}

export interface IAuth {
  // username: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthTokenResult {
  roles: Role[];
  permissions?: PermissionEntity[];

  sub: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  roles: string;
  permissions?: PermissionEntity[];

  sub: string;
  isExpired: boolean;
}
