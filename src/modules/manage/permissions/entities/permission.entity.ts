import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { IDetial } from '../../utils/detial.interface';
import { User } from 'src/modules/user/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity({ name: 'permissions' })
export class PermissionEntity extends BaseEntity implements IDetial {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  module: string;

  @ManyToMany((type) => Role, (rol) => rol.permissions)
  roles: Role[];
  @ManyToMany((type) => User, (user) => user.permissions)
  users: User[];
}
