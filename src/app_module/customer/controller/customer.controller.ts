import { Controller, Get, Post, NotFoundException, Body, Param, Delete, Put, Patch } from '@nestjs/common';

import { CustomerService } from '../service/customer.service';
import { CustomerDto } from '../dto/customer.dto';
import { ICustomer } from '../interfaces/customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private _customerService: CustomerService) { }

    @Get()
   async getCustomers(): Promise<ICustomer[]> {
        return await this._customerService.getCustomers();
    }

    @Get(':uuid')
    async getCustomer(@Param('uuid') uuid: string): Promise<ICustomer> {
        const user = await this._customerService.getCustomer(uuid);
        if (!user) {
            throw new NotFoundException(`Usuario no encontrado papu ${uuid}`);
        }
        return user;
    }

    @Post()
    createCustomer(@Body() customer: CustomerDto): ICustomer {
        const createdCustomer = this._customerService.createCustomer(customer);
        return createdCustomer;
    }

    @Delete(':uuid')
    deleteCustomer(@Param('uuid') uuid: string): boolean {
        const deletedUser = this._customerService.deleteCustomer(uuid);
        if (!deletedUser) {
            throw new NotFoundException(`Usuario no encontrado papu ${uuid}`);
        }
        return true;
    }

    @Put(':uuid')
    updateCustomer(@Param('uuid') uuid: string, @Body() customer: CustomerDto): ICustomer {
        return this._customerService.updateCustomer(uuid, customer)
    }

    @Patch(':uuid')
    patchCustomer(@Param('uuid') uuid: string, @Body() customer: CustomerDto): ICustomer {
        return this._customerService.patchCustomer(uuid, customer)
    }
}