import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentsTypeDto } from './create-equipments-type.dto';

export class UpdateEquipmentsTypeDto extends PartialType(CreateEquipmentsTypeDto) {}
