import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './invoice/invoice.module';
import { CustomerModule } from './customer/customer.module'
import { LoggerMiddleware } from './logger.middleware';


@Module({
  imports: [InvoiceModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggerMiddleware)
        .forRoutes({ path: 'invoices/:uuid', method: RequestMethod.POST }, { path: 'invoices/:uuid', method: RequestMethod.PUT }, { path: 'customer', method: RequestMethod.POST }, { path: 'customer/:uuid', method: RequestMethod.PUT });
    }
}
