import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El correo no es valido' })
  readonly email: string;

  @Transform(({ value }) => value.trim())
  @IsString({ message: 'La contraseña debe de ser una cadena de caracteres' })
  @MinLength(8, { message: 'La contraseña debe de tener minimo 8 caracteres' })
  readonly password: string;
}
