import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageModule } from './manage/manage.module';
import { PlansModule } from './plans/plans.module';
import { CellarModule } from './cellar/cellar.module';

@Module({
  imports: [UserModule, AuthModule,TypeOrmModule, ManageModule, PlansModule, CellarModule],
})
export class ModulesModule {}
