import { IsString, MinLength, IsDate} from 'class-validator';
import { CustomerDto } from "src/app_module/customer/dto/customer.dto";
import { Invoice_Detail } from "../interfaces/invoice_detail";

export class InvoiceDto {
    customer: CustomerDto;
   @IsString()
   @MinLength(2)
    serie: string;
    @IsString()
    @MinLength(2
        , {
        message:'No se permite un "business_name" menor a $constraint1 caracteres, el valor actual es $value por favor selecciona más caracteres'
    })
    business_name: string;
    @IsDate()
    expedition_date: Date;
    @IsString()
    description?: string;
    subtotal: number;
    total_amount: number;
    vat: number;
    invoice_details: Invoice_Detail[] ;
}