import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../manage/roles/entities/role.entity';
import { PermissionEntity } from '../manage/permissions/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, PermissionEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
