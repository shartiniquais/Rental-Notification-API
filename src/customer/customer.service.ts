import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) { }

    async createOrUpdate(data: Partial<Customer>): Promise<Customer> {

        console.log('Email recherché :', data.email);
        // Recherche un client existant par email
        let customer = await this.customerRepository.findOneBy({ email: data.email });
        console.log('Client trouvé :', customer);

        if (customer) {
            // Mise à jour des informations
            Object.assign(customer, data);
        } else {
            // Création d'un nouveau client
            customer = this.customerRepository.create(data);
        }

        // Sauvegarde en base
        return this.customerRepository.save(customer);
    }
}
