import { PartialType } from '@nestjs/mapped-types';
import { CreateInternetRateDto } from './create-internet-rate.dto';

export class UpdateInternetRateDto extends PartialType(CreateInternetRateDto) {}
