import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TypeEquipmentEnum } from '../enums/TypeEquipmet.enum';

export class CreateEquipmentsTypeDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty({
    message: `Nombre es requerido`,
  })
  name: string;

  @IsEnum(TypeEquipmentEnum, {
    message: `Tipo de equipo no válido`,
  })
  type: TypeEquipmentEnum;
}
