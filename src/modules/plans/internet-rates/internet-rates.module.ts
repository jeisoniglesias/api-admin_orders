import { Module } from '@nestjs/common';
import { InternetRatesService } from './internet-rates.service';
import { InternetRatesController } from './internet-rates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternetRate } from './entities/internet-rate.entity';
import { InternetPlan } from '../internet-plans/entities/internet-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InternetRate, InternetPlan])],
  controllers: [InternetRatesController],
  providers: [InternetRatesService],
  exports: [InternetRatesService, TypeOrmModule],
})
export class InternetRatesModule {}
