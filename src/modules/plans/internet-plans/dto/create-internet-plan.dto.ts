import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateInternetPlanDto {
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  name: string;

  @IsNumber({}, { message: 'El valor iva debe ser numero' })
  vrIva: number = 0;

  @IsNumber({}, { message: 'El valor antes del impuesto debe ser numero' })
  vrBase: number;

  @IsNumber({}, { message: 'La velocidad debe ser numero' })
  velocidad: number;

  @IsOptional()
  @IsNotEmpty({ message: 'El medio no puede estar vacío.' })
  medio: string;

  @IsNumber({}, { message: 'Seleccione una tarifa' })
  tarifa: number;

 
}
