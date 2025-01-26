import { Body, Controller, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';

import { CreateCustomerDto } from './create-customer.dto';

@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Post()
    async createOrUpdateCustomer(@Body() customerData: CreateCustomerDto) {
        console.log('Données reçues :', customerData); // Log pour debug
        const customer = await this.customerService.createOrUpdate(customerData);
        return {
            message: 'Client ajouté ou modifié avec succès',
            customer,
        };
    }
}
