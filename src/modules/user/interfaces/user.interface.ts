import { STATUS_USER } from 'src/constants/interfaces.entities';
import { PermissionEntity } from 'src/modules/manage/permissions/entities/permission.entity';
import { Role } from 'src/modules/manage/roles/entities/role.entity';

export interface IUser {
  email: string;
  password: string;
  roles: Role[];
  permissions?: PermissionEntity[];
  status: STATUS_USER;
  isActive: boolean;
  isBlocked: boolean;
  timeBlocked: number;
}
