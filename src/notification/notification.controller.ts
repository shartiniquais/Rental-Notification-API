import { Controller, Get, Query, NotFoundException  } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications') // Endpoint : /notifications
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  // Route pour tester les notifications
  @Get('test')
  async testNotifications() {
    return await this.notificationService.testNotifications();
  }

  // Route pour tester les timezones
  @Get('test-timezones')
  async testTimezones(@Query('daysBefore') daysBefore: number) {
    const rentals = await this.notificationService['getRentalsToNotify'](daysBefore);
    return rentals.map((rental) => ({
      rental_id: rental.rental_id,
      customer_email: rental.customer.email,
      customer_timezone: rental.customer.timezone,
      due_date: rental.due_date,
    }));
  }

  // Route pour lister les tâches planifiées
  @Get('planned-tasks')
  async listPlannedTasks() {
    const tasks = await this.notificationService.listPlannedTasks();
    return {
      message: 'Liste des tâches planifiées',
      tasks,
    };
  }

  // Route pour déclencher les notifications J-5
  @Get('trigger-j5')
  async triggerJMinusFiveNotifications() {
    const result = await this.notificationService.triggerJMinusFiveNotifications();
    return {
      message: 'Tâche J-5 exécutée manuellement',
      result,
    };
  }

  // Route pour déclencher les notifications J-3
  @Get('trigger-j3')
  async triggerJMinusThreeNotifications() {
    const result = await this.notificationService.triggerJMinusThreeNotifications();
    return {
      message: 'Tâche J-3 exécutée manuellement',
      result,
    };
  }

  // Route pour envoyer une notification par email
  @Get('send-by-email')
  async sendNotificationByEmail(
    @Query('email') email: string,
    @Query('daysBefore') daysBefore: number,
  ) {
    if (!email || (daysBefore !== 3 && daysBefore !== 5)) {
      return {
        message: "Paramètres invalides. Fournissez un email valide et 'daysBefore' doit être 3 ou 5.",
      };
    }

    const result = await this.notificationService.sendNotificationByEmail(email, daysBefore);
    return { message: result };
  }

  // Route pour obtenir le statut des notifications par email
  @Get('status')
  async getNotificationStatus(@Query('email') email: string) {
    if (!email) {
      throw new NotFoundException('Email non spécifié.');
    }
    return this.notificationService.getNotificationsByEmail(email);
  }
}
