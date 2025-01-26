import { Injectable, Logger, NotFoundException} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Rental } from '../entities/rental.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as moment from 'moment-timezone'; // Pour les timezones des clients

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
  ) { }

  // Tâche J-5
  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async sendJMinusFiveNotifications() {
    this.logger.log('Vérification des notifications J-5');
    const rentals = await this.getRentalsToNotify(5); // Locations à J-5
    for (const rental of rentals) {
      this.logger.log(
        `Notification J-5 envoyée à ${rental.customer.email} pour la location ${rental.rental_id}`,
      );
      rental.is_notified_j5 = true; // Marque comme notifié
      await this.rentalRepository.save(rental); // Sauvegarde dans la base
    }
  }

  // Tâche J-3
  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async sendJMinusThreeNotifications() {
    this.logger.log('Vérification des notifications J-3');
    const rentals = await this.getRentalsToNotify(3); // Locations à J-3
    for (const rental of rentals) {
      this.logger.log(
        `Notification J-3 envoyée à ${rental.customer.email} pour la location ${rental.rental_id}`,
      );
      rental.is_notified_j3 = true; // Marque comme notifié
      await this.rentalRepository.save(rental); // Sauvegarde dans la base
    }
  }

  // Méthode pour récupérer les locations à notifier
  private async getRentalsToNotify(daysBefore: number): Promise<Rental[]> {
    const rentals = await this.rentalRepository.find({
      relations: ['customer'],
      where: [
        { is_notified_j5: false }, // Locations J-5 non notifiées
        { is_notified_j3: false }, // Locations J-3 non notifiées
      ],
    });


    console.log('Locations récupérées depuis la base :', rentals);
    

    // Filtre les locations en fonction de la timezone des clients
    return rentals.filter((rental) => {
      const clientTimezone = rental.customer.timezone || 'UTC';
      const now = moment().tz(clientTimezone).hour(12).minute(0).second(0);
      const dueDate = moment(rental.due_date).tz(clientTimezone);
      const diffDays = dueDate.startOf('day').diff(now.startOf('day'), 'days');
      
      /*
      console.log('Rental ID:', rental.rental_id);
      console.log('Client Timezone:', clientTimezone);
      console.log('Now (local):', now.format());
      console.log('Due Date (local):', dueDate.format());
      console.log('Diff Days:', diffDays);
      console.log('Days Before: ', daysBefore)
      console.log('Notification Criteria Met:', diffDays == daysBefore);
      */
      return diffDays == daysBefore;
    });
  }

  // méthode pour tester les notifs
  async testNotifications() {
    // Récupère toutes les locations sans conditions sur la date
    const rentals = await this.rentalRepository.find({
      relations: ['customer'],
      where: [
        { is_notified_j5: false }, // Locations J-5 non notifiées
        { is_notified_j3: false }, // Locations J-3 non notifiées
      ],
    });

    // Simule l'envoi de notifications pour chaque location
    for (const rental of rentals) {
      this.logger.log(
        `TEST: Notification envoyée à ${rental.customer?.email || 'email inconnu'} pour la location ${rental.rental_id}`,
      );

      // Marque comme notifié pour tester
      /*
      rental.is_notified_j5 = true;
      rental.is_notified_j3 = true;
      await this.rentalRepository.save(rental); // Sauvegarde les changements
      */
    }

    return `Test terminé : ${rentals.length} notifications envoyées.`;
  }

  // Méthode pour lister les tâches planifiées
  async listPlannedTasks(): Promise<any[]> {
    const rentalsJ5 = await this.rentalRepository.find({
      where: { is_notified_j5: false },
      relations: ['customer'],
    });
  
    const rentalsJ3 = await this.rentalRepository.find({
      where: { is_notified_j3: false },
      relations: ['customer'],
    });
  
    // Combine les tâches J-5 et J-3 avec des informations claires
    const tasks = [
      ...rentalsJ5.map((rental) => ({
        task: 'J-5 Notification',
        customer_email: rental.customer.email,
        rental_id: rental.rental_id,
        due_date: rental.due_date,
      })),
      ...rentalsJ3.map((rental) => ({
        task: 'J-3 Notification',
        customer_email: rental.customer.email,
        rental_id: rental.rental_id,
        due_date: rental.due_date,
      })),
    ];
  
    return tasks;
  }

  // Méthode pour envoyer les notifications J-5
  async triggerJMinusFiveNotifications(): Promise<string> {
    const rentals = await this.getRentalsToNotify(5);
  
    for (const rental of rentals) {
      this.logger.log(
        `Notification J-5 envoyée à ${rental.customer.email} pour la location ${rental.rental_id}`,
      );
      rental.is_notified_j5 = true; // Marquer comme notifié
      await this.rentalRepository.save(rental); // Sauvegarde
    }
  
    return `${rentals.length} notifications J-5 envoyées.`;
  }
  
  // Méthode pour envoyer les notifications J-3
  async triggerJMinusThreeNotifications(): Promise<string> {
    const rentals = await this.getRentalsToNotify(3);
  
    for (const rental of rentals) {
      this.logger.log(
        `Notification J-3 envoyée à ${rental.customer.email} pour la location ${rental.rental_id}`,
      );
      rental.is_notified_j3 = true; // Marquer comme notifié
      await this.rentalRepository.save(rental); // Sauvegarde
    }
  
    return `${rentals.length} notifications J-3 envoyées.`;
  }

  // Méthode pour envoyer une notification par email
  async sendNotificationByEmail(email: string, daysBefore: number): Promise<string> {
    // Vérifie si un client avec cet email existe
    const rentals = await this.rentalRepository.find({
      relations: ['customer'],
      where: [
        { is_notified_j5: false, customer: { email } }, // J-5 non notifié
        { is_notified_j3: false, customer: { email } }, // J-3 non notifié
      ],
    });
  
    if (rentals.length === 0) {
      return `Aucune location trouvée pour l'email "${email}" avec les critères de notification J-${daysBefore}.`;
    }
  
    // Envoie la notification
    for (const rental of rentals) {
      this.logger.log(
        `Notification J-${daysBefore} envoyée à ${rental.customer.email} pour la location ${rental.rental_id}`,
      );
  
      // Marque comme notifié en fonction de J-5 ou J-3
      if (daysBefore === 5) {
        rental.is_notified_j5 = true;
      } else if (daysBefore === 3) {
        rental.is_notified_j3 = true;
      }
  
      await this.rentalRepository.save(rental); // Sauvegarde les changements
    }
  
    return `${rentals.length} notification(s) J-${daysBefore} envoyée(s) à "${email}".`;
  }

  // Méthode pour récupérer les notifications par email
  async getNotificationsByEmail(email: string) {
    // Vérifie si le client existe
    const rentals = await this.rentalRepository.find({
      relations: ['customer'],
      where: { customer: { email } },
    });
  
    if (rentals.length === 0) {
      throw new NotFoundException(`Aucune location trouvée pour l'email : ${email}`);
    }
  
    // Transforme les données pour l'affichage
    return {
      email,
      rentals: rentals.map((rental) => ({
        rental_id: rental.rental_id,
        is_notified_j5: rental.is_notified_j5,
        is_notified_j3: rental.is_notified_j3,
      })),
    };
  }
}
