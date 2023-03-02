import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CustomerDto {
    id: string;
    @IsString()
    @MinLength(2, {
        message:'No se permite un nombre corto, menor a $constraint1 caracteres, el valor actual es $value por favor selecciona uno válido'
    })
    @MaxLength(20, {
        message:'No se permite un nombre mayor a $constraint1 caracteres, el valor actual es $value por favor selecciona uno válido'
    })
    name: string;
    @IsString()
    @IsOptional()
    @MinLength(2, {
        message:'No se permite un Apellido corto, menor a $constraint1 caracteres, el valor actual es $value por favor selecciona uno válido'
    })
    @MaxLength(20, {
        message:'No se permite un Apellido mayor a $constraint1 caracteres, el valor actual es $value por favor selecciona uno válido'
    })
    lastName: string;
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(8, {
        message:'No se permite un numero de digitos no valido $constraint1, el valor actual es $value por favor selecciona uno válido'
    })
    @MaxLength(8, {
        message:'No se permite un numero de digitos no valido $constraint1, el valor actual es $value por favor selecciona uno válido'
    })
    ci: string;
    @IsString()
    @MinLength(2, {
        message:'No se permite un numero corto, menor a $constraint1 caracteres, el valor actual es $value por favor selecciona uno válido'
    })
    @MaxLength(20, {
        message:'No se permite un numero mayor a $constraint1 caracteres, el valor actual es $value por favor selecciona uno válido'
    })
    phoneNumber: string;
}
