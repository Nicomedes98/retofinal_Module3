import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerDto } from '../dto/customer.dto';

@Injectable()
export class IncludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((customer: CustomerDto) => {
        if(!customer.hasOwnProperty('lastName')){
            customer.lastName = 'null';
        }
        return customer; 
        }));
  }
}