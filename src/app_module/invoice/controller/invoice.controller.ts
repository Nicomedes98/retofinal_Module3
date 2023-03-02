import { Controller, Get, Post, NotFoundException, Body, Param, Delete, Put, Patch, UseInterceptors, UseGuards } from '@nestjs/common';

import { InvoiceService } from '../service/invoice.service';
import { InvoiceDto } from '../interfaces/invoice';
import { AuthGuard } from 'src/app_module/auth.guard';
import { IncludeNullInterceptor } from '../interceptors/modif.interceptor';


@Controller('invoices')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) { }

    @Get()
    async findAll(): Promise<InvoiceDto[]> {
        return this.invoiceService.getInvoices();
    }

    @Get(':id')
    @UseInterceptors(IncludeNullInterceptor)
    async findById(@Param('id') id: string): Promise<InvoiceDto> {
        const invoice = this.invoiceService.getInvoiceById(id);
        if (!invoice) {
            throw new NotFoundException(`No se encutra el ${id} f`);
        }
        return invoice;
    }

    @Post(':uuid')
    @UseInterceptors(IncludeNullInterceptor)
    @UseGuards(AuthGuard)
    async create(@Body() invoice: InvoiceDto, @Param("uuid") uuid: string): Promise<InvoiceDto> {
        return this.invoiceService.createInvoice(invoice, uuid);
    }

    @Put(':id')
    @UseInterceptors(IncludeNullInterceptor)
    @UseGuards(AuthGuard)
    async update(@Param('id') id: string, @Body() invoice: InvoiceDto): Promise<InvoiceDto> {
        const updatedInvoice = this.invoiceService.updateInvoice(id, invoice);
        if (!updatedInvoice) {
            throw new NotFoundException(`Error ${id}`);
        }
        return updatedInvoice;
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(@Param('id') id: string): Promise<boolean> {
        const deleted = this.invoiceService.deleteInvoice(id);
        if (!deleted) {
            throw new NotFoundException(`No se puede eliminar el user ${id}`);
        }
        return deleted;
    }
    @Patch(':uuid')
    @UseGuards(AuthGuard)
    @UseInterceptors(IncludeNullInterceptor)
    patchInvoice(@Param('uuid') uuid: string, @Body() invoice: InvoiceDto): InvoiceDto {
        return this.invoiceService.patchInvoice(uuid, invoice)
    }
}

