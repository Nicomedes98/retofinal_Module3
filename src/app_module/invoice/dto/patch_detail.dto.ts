import { IsString, MaxLength, MinLength } from "class-validator";

export class Patch_Detail {
    @IsString()
    @MinLength(2)
    id: string; 
    @MaxLength(30, {
        message:'No se permite una descripcion mayor a $constraint1 caracteres, el valor actual es $value por favor selecciona menos caracteres'
    })
    description: string;
    quantity: number;
    unit_price: number;
    amount: number;
}