import { Module } from '@nestjs/common';
import { InternetPlansService } from './internet-plans.service';
import { InternetPlansController } from './internet-plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternetPlan } from './entities/internet-plan.entity';
import { InternetRate } from '../internet-rates/entities/internet-rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InternetPlan, InternetRate])],
  controllers: [InternetPlansController],
  providers: [InternetPlansService],
  exports: [InternetPlansService, TypeOrmModule],
})
export class InternetPlansModule {}
