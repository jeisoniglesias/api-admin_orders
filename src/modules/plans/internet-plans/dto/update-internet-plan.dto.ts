import { PartialType } from '@nestjs/mapped-types';
import { CreateInternetPlanDto } from './create-internet-plan.dto';

export class UpdateInternetPlanDto extends PartialType(CreateInternetPlanDto) {}
