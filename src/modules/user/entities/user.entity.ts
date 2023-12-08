import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { BaseEntity } from 'src/utils/base.entity';
import { Exclude } from 'class-transformer';
import { BLOCKED_TIME, STATUS_USER } from 'src/constants/interfaces.entities';
import { Role } from 'src/modules/manage/roles/entities/role.entity';
import { PermissionEntity } from 'src/modules/manage/permissions/entities/permission.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Exclude()
  @Column({ type: 'text' })
  password!: string;

  @Column({ type: 'enum', enum: STATUS_USER, nullable: true })
  status!: STATUS_USER;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ type: 'boolean', default: false })
  isBlocked!: boolean;

  @Column({ type: 'enum', enum: BLOCKED_TIME, nullable: true })
  timeBlocked!: BLOCKED_TIME;

  @ManyToMany((type) => Role, { cascade: true, eager: true })
  @JoinTable({ name: 'adm_user_has_roles' })
  roles: Role[];

  @ManyToMany((type) => PermissionEntity, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinTable({ name: 'adm_user_has_permissions' })
  permissions: PermissionEntity[];
}
