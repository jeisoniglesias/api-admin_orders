import { Module } from '@nestjs/common';
import { InternetPlansModule } from './internet-plans/internet-plans.module';
import { InternetRatesModule } from './internet-rates/internet-rates.module';

@Module({
  imports: [InternetPlansModule, InternetRatesModule]
})
export class PlansModule {}
