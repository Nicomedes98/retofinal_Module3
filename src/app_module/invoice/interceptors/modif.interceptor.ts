import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvoiceDto } from '../dto/invoice.dto';

@Injectable()
export class IncludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((invoice: InvoiceDto) => {
        if(!invoice.hasOwnProperty('description')){
            invoice.description = 'null';
        }
        return invoice; 
        }));
  }
}