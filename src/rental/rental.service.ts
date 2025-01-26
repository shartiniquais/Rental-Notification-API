import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from '../entities/rental.entity';
import { CreateRentalDto } from './create-rental.dto';

@Injectable()
export class RentalService {
    constructor(
        @InjectRepository(Rental)
        private readonly rentalRepository: Repository<Rental>,
    ) { }

    async createOrUpdateRental(data: CreateRentalDto): Promise<Rental> {
        // Convertit rental_date en objet Date
        const rentalDate = new Date(data.rental_date);

        // Vérifie si une location existe déjà
        const existingRental = await this.rentalRepository.findOne({
            where: {
                rental_date: rentalDate,
                inventory_id: data.inventory_id,
                customer: { customer_id: data.customer_id },
            },
            relations: ['customer'], // Ajout des relations nécessaires
        });

        if (existingRental) {
            // Met à jour la location existante
            Object.assign(existingRental, { ...data, rental_date: rentalDate });
            return this.rentalRepository.save(existingRental);
        } else {
            // Crée une nouvelle location
            const rental = this.rentalRepository.create({
                ...data,
                rental_date: rentalDate,
                customer: { customer_id: data.customer_id }, // Associe le client par sa clé étrangère
            });
            return this.rentalRepository.save(rental);
        }
    }
}
