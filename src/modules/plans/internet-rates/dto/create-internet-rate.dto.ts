import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInternetRateDto {
  @Transform(({ value }) => value.trim())
  @IsString({ message: `Nombre debe ser un texto` })
  @IsNotEmpty({
    message: `Nombre es requerido`,
  })
  name: string;
}
