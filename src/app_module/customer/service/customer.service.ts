import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CustomerDto } from '../dto/customer.dto';
import { ICustomer } from '../interfaces/customer.dto';


@Injectable()
export class CustomerService {

    public customers: ICustomer[] = [
        {
            id: '1',
            name: 'John',
            lastName: 'Edward',
            ci: '1234',
            phoneNumber: '099485134',
            email: 'Ed@gmail.com'
        },
        {
            id: '2',
            name: 'Casandra',
            lastName: 'Vasquez',
            ci: '2345',
            phoneNumber: '099678934',
            email: 'Cas@gmail.com'
        },
        {
            id: '3',
            name: 'Frank',
            lastName: 'Vazquez',
            ci: '3456',
            phoneNumber: '092678530',
            email: 'V@gmail.com'
        },

    ];
    async getCustomers(): Promise<ICustomer[]> {
        return this.customers;
    }

    async getCustomer(uuid: string): Promise<ICustomer> {
        const customer = this.customers.find(customer => customer.id === uuid);
        if (!customer) {
            throw new NotFoundException(`Usuario no encontrado ${uuid} `);
        }
        return customer;
    }

    createCustomer(customer: CustomerDto): ICustomer {
        const newCustomerId = Math.random().toString(36).slice(-2);
        const newCustomer: ICustomer = {
            id: newCustomerId, ...customer,
        };

        this.customers.push(newCustomer);
        return newCustomer;
    }

    deleteCustomer(uuid: string): boolean {
        const customerIndex = this.customers.findIndex(customer => customer.id === uuid);
        if (customerIndex < 0) {
            return false;
        }
        this.customers.splice(customerIndex, 1);
        return true;
    }

    updateCustomer(uuid: string, customer: CustomerDto): ICustomer {
        if (uuid !== customer.id)
            throw new InternalServerErrorException(`Ocurrió un error inesperado para su solicitud ${uuid} `);
        const customerIndex = this.customers.findIndex(customer => customer.id === uuid);
        if (customerIndex < 0) {
            throw new NotFoundException(`Usuario no encontrado ${uuid} `);
        }
        this.customers.splice(customerIndex, 1);
        this.customers.push(customer as ICustomer)
        return customer as ICustomer;
    }

    patchCustomer(uuid: string, customer: CustomerDto): ICustomer {
        const oldcustomer = this.customers.find(customer => customer.id === uuid);
        if (oldcustomer) {
            let customerpatched: ICustomer = {
                ...oldcustomer,
                ...customer
            }
            this.customers = this.customers.map((customer: ICustomer) => customer.id === uuid ? customerpatched : customer)
            return customerpatched;
        }
        throw new NotFoundException(`Usuario no encontrado ${uuid} `);
    }


}







