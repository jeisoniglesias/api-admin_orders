import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { IDetial } from '../../utils/detial.interface';
import { User } from 'src/modules/user/entities/user.entity';
import { PermissionEntity } from '../../permissions/entities/permission.entity';

@Entity({ name: 'roles' })
export class Role extends BaseEntity implements IDetial {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany((type) => PermissionEntity, { cascade: true, eager: true })
  @JoinTable({ name: 'adm_role_has_permisions' })
  permissions: PermissionEntity[];

  @OneToMany((type) => User, (user) => user.roles)
  users: User[];
}
