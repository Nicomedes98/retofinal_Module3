import { Controller, Get, Post, NotFoundException, Body, Param, Delete, Put, Patch, UseInterceptors, UseGuards } from '@nestjs/common';

import { CustomerService } from '../service/customer.service';
import { CustomerDto } from '../dto/customer.dto';
import { ICustomer } from '../interfaces/customer.dto';
import { IncludeNullInterceptor } from '../interceptor/modif.intercerptor';
import { AuthGuard } from 'src/app_module/auth.guard';

@Controller('customer')
export class CustomerController {
    constructor(private _customerService: CustomerService) { }

    @Get()
   async getCustomers(): Promise<ICustomer[]> {
        return await this._customerService.getCustomers();
    }

    @Get(':uuid')
    @UseInterceptors(IncludeNullInterceptor)
    async getCustomer(@Param('uuid') uuid: string): Promise<ICustomer> {
        const user = await this._customerService.getCustomer(uuid);
        if (!user) {
            throw new NotFoundException(`Usuario no encontrado papu ${uuid}`);
        }
        return user;
    }

    @Post()
    @UseInterceptors(IncludeNullInterceptor)
    @UseGuards(AuthGuard)
    createCustomer(@Body() customer: CustomerDto): ICustomer {
        const createdCustomer = this._customerService.createCustomer(customer);
        return createdCustomer;
    }

    @Delete(':uuid')
    @UseGuards(AuthGuard)
    deleteCustomer(@Param('uuid') uuid: string): boolean {
        const deletedUser = this._customerService.deleteCustomer(uuid);
        if (!deletedUser) {
            throw new NotFoundException(`Usuario no encontrado papu ${uuid}`);
        }
        return true;
    }

    @Put(':uuid')
    @UseGuards(AuthGuard)
    @UseInterceptors(IncludeNullInterceptor)
    updateCustomer(@Param('uuid') uuid: string, @Body() customer: CustomerDto): ICustomer {
        return this._customerService.updateCustomer(uuid, customer)
    }

    @Patch(':uuid')
    @UseGuards(AuthGuard)
    @UseInterceptors(IncludeNullInterceptor)
    patchCustomer(@Param('uuid') uuid: string, @Body() customer: CustomerDto): ICustomer {
        return this._customerService.patchCustomer(uuid, customer)
    }
}